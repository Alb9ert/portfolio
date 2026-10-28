import { motion, animate, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoDistance, geoBounds } from "d3-geo";
import { feature } from "topojson-client";

const CPH = [12.5683, 55.6761];
const START = [-40, 22]; // Begin over the Atlantic so the globe visibly turns to Europe
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 26;
const DURATION = 2.6; // seconds for the whole fly-in
const DENMARK_ID = "208";

// Monochrome line-art palette to match the rest of the site
const COLORS = {
  ocean: "#f7f7f7",
  graticule: "rgba(17, 17, 17, 0.1)",
  land: "rgba(17, 17, 17, 0.06)",
  denmark: "rgba(17, 17, 17, 0.14)",
  border: "rgba(17, 17, 17, 0.85)",
  rim: "#111",
  marker: "#111",
  pulse: "17, 17, 17",
  halo: "#f7f7f7",
  label: "#111",
};

const clamp = (x) => Math.min(1, Math.max(0, x));
const smooth = (x, a, b) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;
const graticule = geoGraticule10();

// Both resolutions load once and are shared; bounds are precomputed for culling
let mapsPromise;
const prepare = (topo) =>
  feature(topo, topo.objects.countries).features.map((f) => ({
    feature: f,
    bounds: geoBounds(f),
    isDenmark: f.id === DENMARK_ID,
  }));
const loadMaps = () =>
  (mapsPromise ??= Promise.all([
    import("world-atlas/countries-110m.json"),
    import("world-atlas/countries-50m.json"),
  ]).then(([coarse, fine]) => ({ coarse: prepare(coarse.default), fine: prepare(fine.default) })));

// Skip countries outside the visible window - most of the cost when zoomed in
function isVisible({ bounds: [[w, s], [e, n]] }, [lon, lat], reach) {
  if (reach >= 60 || w > e) return true;
  if (n < lat - reach || s > lat + reach) return false;
  const lonReach = reach / Math.max(0.1, Math.cos((Math.min(85, Math.abs(lat) + reach) * Math.PI) / 180));
  return e >= lon - lonReach && w <= lon + lonReach;
}

function formatCoord(value, pos, neg) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? pos : neg}`;
}

function Globe() {
  const panelRef = useRef(null);
  const canvasRef = useRef(null);
  const coordsRef = useRef(null);
  const mapsRef = useRef(null);
  const [ready, setReady] = useState(false);
  const isNear = useInView(panelRef, { margin: "400px" });
  const shouldPlay = useInView(panelRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const opacity = useTransform(progress, [0, 0.12], [0, 1]);
  const scale = useTransform(progress, [0, 0.3], [0.92, 1]);

  useEffect(() => {
    if (!isNear || mapsRef.current) return;
    loadMaps().then((maps) => {
      mapsRef.current = maps;
      setReady(true);
    });
  }, [isNear]);

  // Only start once the detailed map is loaded, so the zoom never stalls
  useEffect(() => {
    if (!shouldPlay || !ready) return;
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration: DURATION, ease: "linear" });
    return () => controls.stop();
  }, [shouldPlay, ready, reduceMotion, progress]);

  useEffect(() => {
    if (!isNear || !ready) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const still = document.createElement("canvas"); // finished map, so the end state only redraws the marker
    const stillCtx = still.getContext("2d");
    const projection = geoOrthographic().precision(0.5);
    const toPath = geoPath(projection);
    let stillReady = false;
    let size = { width: 0, height: 0, dpr: 1 };
    let frame;
    let center = START;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { width: entry.contentRect.width, height: entry.contentRect.height, dpr };
      for (const [c, c2d] of [[canvas, ctx], [still, stillCtx]]) {
        c.width = size.width * dpr;
        c.height = size.height * dpr;
        c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      stillReady = false;
    });
    resizeObserver.observe(canvas);

    // One continuous fly-to: turn and zoom share the same timeline
    const updateProjection = (p) => {
      const { width, height } = size;
      const turn = smooth(p, 0, 0.8);
      const zoom = Math.exp(lerp(Math.log(MIN_ZOOM), Math.log(MAX_ZOOM), smooth(p, 0.05, 1)));
      center = [lerp(START[0], CPH[0], turn), lerp(START[1], CPH[1], turn)];
      const scale = Math.min(width, height) * 0.4 * zoom;

      projection
        .translate([width / 2, height / 2])
        .scale(scale)
        .rotate([-center[0], -center[1]])
        .clipExtent([[0, 0], [width, height]]);

      // Angular distance from the centre to the panel's corner
      const corner = Math.hypot(width, height) / 2;
      return corner >= scale ? 90 : (Math.asin(corner / scale) * 180) / Math.PI;
    };

    const drawMap = (c2d, p, reach) => {
      const { width, height } = size;
      const countries = reach < 30 ? mapsRef.current.fine : mapsRef.current.coarse;

      c2d.clearRect(0, 0, width, height);

      const sphere = new Path2D(toPath({ type: "Sphere" }));
      c2d.fillStyle = COLORS.ocean;
      c2d.fill(sphere);

      c2d.strokeStyle = COLORS.graticule;
      c2d.lineWidth = 0.6;
      c2d.stroke(new Path2D(toPath(graticule)));

      // Build the visible countries once, then fill and outline the same path
      let landPath = "";
      let denmarkPath = "";
      for (const country of countries) {
        if (!isVisible(country, center, reach)) continue;
        const d = toPath(country.feature);
        if (!d) continue;
        landPath += d;
        if (country.isDenmark) denmarkPath = d;
      }
      const land = new Path2D(landPath);
      c2d.fillStyle = COLORS.land;
      c2d.fill(land);

      if (denmarkPath) {
        c2d.globalAlpha = smooth(p, 0.5, 0.9);
        c2d.fillStyle = COLORS.denmark;
        c2d.fill(new Path2D(denmarkPath));
        c2d.globalAlpha = 1;
      }

      c2d.lineJoin = "round";
      c2d.strokeStyle = COLORS.border;
      c2d.lineWidth = 0.8;
      c2d.stroke(land);

      c2d.strokeStyle = COLORS.rim;
      c2d.lineWidth = 1.5;
      c2d.stroke(sphere);
    };

    const drawMarker = (p, time) => {
      const alpha = smooth(p, 0.8, 0.97);
      if (alpha <= 0 || geoDistance(CPH, center) >= Math.PI / 2) return;
      const [x, y] = projection(CPH);
      const pulse = (time / 1600) % 1;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, 6 + pulse * 18, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${COLORS.pulse}, ${0.7 * (1 - pulse)})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.marker;
      ctx.fill();

      ctx.font = "500 14px 'PP Neue Montreal', sans-serif";
      ctx.lineWidth = 4;
      ctx.strokeStyle = COLORS.halo;
      ctx.strokeText("Copenhagen, DK", x + 14, y + 5);
      ctx.fillStyle = COLORS.label;
      ctx.fillText("Copenhagen, DK", x + 14, y + 5);
      ctx.globalAlpha = 1;
    };

    const render = (time) => {
      frame = requestAnimationFrame(render);
      if (!size.width) return;

      const p = progress.get();
      const reach = updateProjection(p);

      if (p < 1) {
        drawMap(ctx, p, reach);
      } else {
        if (!stillReady) {
          drawMap(stillCtx, p, reach);
          stillReady = true;
        }
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.drawImage(still, 0, 0, size.width, size.height);
      }
      drawMarker(p, time);

      coordsRef.current.textContent = `${formatCoord(center[1], "N", "S")}  ${formatCoord(center[0], "E", "W")}`;
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [isNear, ready, progress]);

  return (
    <motion.div
      ref={panelRef}
      className="relative w-full max-w-[560px] aspect-square mx-auto rounded-2xl overflow-hidden border border-black/10 bg-[#e6e6e6]"
      style={{ opacity, scale }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={coordsRef}
        className="absolute bottom-4 left-4 text-xs tabular-nums bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1"
      />
    </motion.div>
  );
}

export default Globe;
