import { motion } from "framer-motion";

const INK = "#111";
const PAPER = "#ececec";

// Line-draw entrance: stroke traces in, then fill fades in
const draw = (delay = 0) => ({
  initial: { pathLength: 0, fillOpacity: 0 },
  animate: { pathLength: 1, fillOpacity: 1 },
  transition: {
    pathLength: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay },
    fillOpacity: { duration: 0.6, delay: delay + 1 },
  },
});

const line = { stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };

// Outlined "tube" limb: thick ink stroke with a paper stroke on top
function Limb({ d, delay }) {
  return (
    <>
      <motion.path d={d} fill="none" stroke={INK} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" {...draw(delay)} />
      <motion.path d={d} fill="none" stroke={PAPER} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" {...draw(delay)} />
    </>
  );
}

// Classic football pattern: black centre pentagon, five clipped edge pentagons, seams between
const BALL = { cx: 192, cy: 68, r: 17 };
const polar = (deg, dist, ox = BALL.cx, oy = BALL.cy) => [
  ox + dist * Math.cos((deg * Math.PI) / 180),
  oy + dist * Math.sin((deg * Math.PI) / 180),
];
const pentagon = (ox, oy, rad, rot) =>
  "M" + [0, 1, 2, 3, 4].map((j) => polar(rot + 72 * j, rad, ox, oy).map((n) => n.toFixed(2)).join(" ")).join(" L") + " Z";
const SPOKES = [0, 1, 2, 3, 4].map((k) => -90 + 72 * k);
const BALL_PATCHES = [
  pentagon(BALL.cx, BALL.cy, 6, -90),
  ...SPOKES.map((a) => pentagon(...polar(a, BALL.r + 1), 6.5, a + 180)),
].join(" ");
const BALL_SEAMS = SPOKES.map((a) => {
  const [x1, y1] = polar(a, 6);
  const [x2, y2] = polar(a, BALL.r - 5.5);
  const [x3, y3] = polar(a + 72 + 180, 6.5, ...polar(a, BALL.r + 1));
  const [x4, y4] = polar(a + 36, BALL.r);
  return `M${x1} ${y1} L${x2} ${y2} M${x3} ${y3} L${x4} ${y4}`;
}).join(" ");

const BOUNCE = { duration: 1.1, repeat: Infinity, ease: ["easeOut", "easeIn"], times: [0, 0.5, 1] };

function CoderIllustration({ className = "" }) {
  return (
    <svg viewBox="0 -16 400 324" className={className} role="img" aria-label="Line illustration of a guy coding at a desk while bouncing a football on his head">
      <defs>
        <clipPath id="ball-clip">
          <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} />
        </clipPath>
      </defs>

      {/* Floor */}
      <motion.path d="M16 300 H396" {...line} fill="none" {...draw(0)} />

      {/* Plant */}
      <g {...line} fill={PAPER}>
        <motion.path d="M66 272 C50 242 52 216 60 196 C70 220 72 248 66 272 Z" {...draw(0.3)} />
        <motion.path d="M66 272 C80 246 92 232 106 226 C100 248 88 264 66 272 Z" {...draw(0.4)} />
        <motion.path d="M66 272 C46 258 36 246 30 232 C48 238 60 252 66 272 Z" {...draw(0.5)} />
        <motion.path d="M48 270 H84 L80 300 H52 Z" {...draw(0.2)} />
      </g>

      {/* Desk */}
      <motion.path d="M228 192 H392 V200 H228 Z" {...line} fill={INK} {...draw(0.1)} />
      <motion.path d="M262 200 V300 M386 200 V300" {...line} fill="none" {...draw(0.2)} />

      {/* Mug + steam */}
      <motion.path d="M346 170 H366 V188 Q366 192 362 192 H350 Q346 192 346 188 Z M366 175 Q375 178 366 186" {...line} fill={PAPER} {...draw(0.6)} />
      {[350, 360].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 162 q-4 -6 0 -12 q4 -6 0 -12`}
          {...line}
          strokeWidth={1.8}
          fill="none"
          animate={{ opacity: [0, 0.8, 0], y: [4, -4, -10] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.5 + i * 1.2, ease: "easeInOut" }}
        />
      ))}

      {/* Laptop */}
      <motion.path d="M246 186 H318 V192 H246 Z M314 190 L320 190 L334 140 L328 138 Z" {...line} fill={INK} {...draw(0.5)} />

      {/* Code floating up from the laptop */}
      {["</>", "{ }", ";"].map((glyph, i) => (
        <motion.text
          key={glyph}
          x={290 + i * 14}
          y={170}
          fontSize={12}
          fontFamily="monospace"
          fill={INK}
          animate={{ opacity: [0, 1, 0], y: [0, -28, -44] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 + i, ease: "easeOut" }}
        >
          {glyph}
        </motion.text>
      ))}

      {/* Chair */}
      <motion.path d="M118 232 H192 V240 H118 Z M118 232 L104 150 L112 148 L126 232 Z" {...line} fill={INK} {...draw(0.1)} />
      <motion.path d="M126 240 L120 300 M184 240 L190 300" {...line} fill="none" {...draw(0.2)} />

      {/* Back arm (typing) */}
      <motion.g animate={{ y: [0, -2, 0, -1, 0] }} transition={{ duration: 0.45, repeat: Infinity, delay: 0.2 }}>
        <Limb d="M174 162 L194 200 L254 192" delay={0.9} />
      </motion.g>

      {/* Legs */}
      <g {...line} fill={PAPER}>
        <motion.path d="M220 230 L214 292 H232 L236 222 Z" {...draw(0.7)} />
        <motion.path d="M140 208 L226 208 Q238 210 236 222 Q234 234 222 234 L146 234 Z" {...draw(0.7)} />
        <motion.path d="M212 290 V300 H250 Q250 292 238 290 Z" fill={INK} {...draw(0.8)} />
      </g>

      {/* Torso */}
      <motion.path d="M180 150 L180 132 H192 L192 150" {...line} fill={PAPER} {...draw(0.8)} />
      <motion.path d="M140 226 C134 196 142 166 162 150 C174 142 190 144 196 156 C202 178 200 200 198 226 Z" {...line} fill={PAPER} {...draw(0.8)} />
      <motion.path d="M150 200 Q170 206 196 200" {...line} strokeWidth={1.8} fill="none" {...draw(1)} />

      {/* Head nods on each ball contact */}
      <motion.g animate={{ y: [2, 0, 0, 2] }} transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.15, 0.85, 1] }}>
        <motion.circle cx={190} cy={114} r={20} {...line} fill={PAPER} {...draw(0.9)} />
        <motion.path d="M170 114 C164 94 184 84 200 90 C212 94 216 102 210 104 C200 100 190 104 186 112 C184 120 178 124 172 122 Z M196 90 Q204 82 212 86 Q206 88 204 94 Z" {...line} fill={INK} {...draw(1)} />
        <g {...line} fill="none">
          <motion.path d="M183 112 Q179 116 184 121" {...draw(1.1)} />
          <motion.circle cx={202} cy={112} r={2} fill={INK} {...draw(1.1)} />
          <motion.path d="M209 112 L213 120 L208 121 M202 126 Q206 129 210 125" strokeWidth={1.8} {...draw(1.2)} />
        </g>
      </motion.g>

      {/* Front arm (typing) */}
      <motion.g animate={{ y: [0, -1, 0, -2, 0] }} transition={{ duration: 0.45, repeat: Infinity }}>
        <Limb d="M184 160 L204 202 L264 190" delay={1} />
      </motion.g>

      {/* Football bouncing on his head */}
      <motion.g animate={{ y: [0, -56, 0] }} transition={BOUNCE}>
        <motion.g
          style={{ originY: 1 }}
          animate={{ scaleY: [0.86, 1, 1, 1, 0.86], scaleX: [1.08, 1, 1, 1, 1.08] }}
          transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.1, 0.5, 0.9, 1] }}
        >
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}>
            {/* Invisible bounds keep the rotation centred on the ball */}
            <circle cx={BALL.cx} cy={BALL.cy} r={BALL.r + 8} fill="none" />
            <motion.circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} fill={PAPER} {...draw(1.2)} />
            <motion.g clipPath="url(#ball-clip)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.8 }}>
              <path d={BALL_PATCHES} fill={INK} />
              <path d={BALL_SEAMS} {...line} strokeWidth={1.4} fill="none" />
            </motion.g>
            <motion.circle cx={BALL.cx} cy={BALL.cy} r={BALL.r} {...line} fill="none" {...draw(1.2)} />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* Sparkle dots */}
      {[[110, 120], [240, 60], [150, 280], [300, 250], [356, 120]].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={2}
          fill={INK}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

export default CoderIllustration;
