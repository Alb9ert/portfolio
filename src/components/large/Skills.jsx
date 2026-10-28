import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { levels, skillCategories } from "../../data/skillsData";
import { degrees } from "../../data/coursesData";
import { getLenis } from "../../App";
import ScrollLinkLabel from "../small/ScrollLinkLabel";

const EASE = [0.19, 1, 0.22, 1];

// All skill pills share one look; the level is shown by signal bars
const PILL = "bg-white/70 text-black border border-black/15";

// Heading line that slides up from behind a mask; triggered by the parent heading
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 1.1, ease: EASE, delay } } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Blur-to-sharp fade for text blocks
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1, ease: EASE, delay },
});

const LABEL = "text-[10px] uppercase tracking-wider text-black/50";

// Smooth-scroll to the skill tree, leaving room for the fixed navbar
const scrollToToolbox = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo("#toolbox", { offset: -100, duration: 1.0 });
  } else {
    document.getElementById("toolbox")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Same hover animation as the section links on the landing page
function ToolboxLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={scrollToToolbox}
      className="inline-block text-left cursor-pointer px-3 py-2 -mx-3 -my-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScrollLinkLabel label="Jump past the courses to languages, frameworks & tools" isHovered={isHovered} />
    </button>
  );
}

// Signal-strength bars: 3 = daily, 2 = confident, 1 = familiar
function LevelBars({ bars, className = "" }) {
  return (
    <span className={`flex items-end gap-[2px] h-[13px] ${className}`} aria-hidden>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-[1px] bg-current ${i <= bars ? "" : "opacity-20"}`}
          style={{ height: `${4 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

// Simple line symbols for general skills that have no brand logo
const GLYPHS = {
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.5 4.5 0 0 0 7 18z" />,
  scan: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  diagram: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </>
  ),
  graph: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M10.7 7.2 6.3 16.8M13.3 7.2l4.4 9.6M7.5 19h9" />
    </>
  ),
  shapes: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <circle cx="17" cy="17" r="4" />
      <path d="M17 3l4 7h-8z" />
    </>
  ),
};

// Skill logo in its brand colour
function SkillIcon({ skill }) {
  const color = skill.icon ? `#${skill.icon.hex}` : skill.color;

  if (skill.badge) {
    return (
      <span
        className="w-4 h-4 rounded-[4px] text-[7px] font-bold text-white flex items-center justify-center tracking-tight"
        style={{ backgroundColor: color }}
      >
        {skill.badge}
      </span>
    );
  }
  if (skill.glyph) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {GLYPHS[skill.glyph]}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <path d={skill.icon.path} fill={color} />
    </svg>
  );
}

function SkillPill({ skill, index }) {
  return (
    // Outer element handles the scroll-in, inner one the hover
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 + index * 0.04 }}
    >
      <motion.div
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 cursor-default ${PILL}`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: EASE }}
        title={`${levels[skill.level].label}: ${levels[skill.level].description}`}
      >
        <SkillIcon skill={skill} />
        <span className="text-[13px] whitespace-nowrap">{skill.name}</span>
        <LevelBars bars={levels[skill.level].bars} className="ml-0.5" />
      </motion.div>
    </motion.li>
  );
}

// Orthogonal connector lines from the root box to every category box,
// measured from the real layout so they follow any column count. Uses offset*
// (layout positions) so in-flight entrance animations don't skew the lines
function useTreeLines(treeRef, rootRef, nodeRefs) {
  const [tree, setTree] = useState({ width: 0, height: 0, paths: [] });

  useLayoutEffect(() => {
    const measure = () => {
      const box = treeRef.current;
      const root = rootRef.current;
      const rx = root.offsetLeft + root.offsetWidth / 2;
      const ry = root.offsetTop + root.offsetHeight;
      const nodes = nodeRefs.current.map((el) => ({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop }));

      // Nodes sharing a row share one horizontal "bus" just above them
      const rowTops = [...new Set(nodes.map((n) => Math.round(n.y)))];
      const paths = nodes.map((n) => {
        const bus = Math.min(...nodes.filter((m) => Math.abs(m.y - n.y) < 4).map((m) => m.y)) - 28;
        return { d: `M ${rx} ${ry} V ${bus} H ${n.x} V ${n.y}`, row: rowTops.indexOf(Math.round(n.y)) };
      });
      setTree({ width: box.offsetWidth, height: box.offsetHeight, paths });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(treeRef.current);
    return () => observer.disconnect();
  }, [treeRef, rootRef, nodeRefs]);

  return tree;
}

function Skills() {
  const sectionRef = useRef(null);
  const treeRef = useRef(null);
  const rootRef = useRef(null);
  const nodeRefs = useRef([]);
  const tree = useTreeLines(treeRef, rootRef, nodeRefs);
  const treeInView = useInView(treeRef, { once: true, margin: "-120px" });

  // Scroll progress for the card slide-up effect
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Card slide-up effect - starts just below and slides up to cover
  const y = useTransform(sectionProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ y }}
      className="w-full relative z-10 min-h-screen -mt-24 px-4 md:px-10 pt-16 md:pt-28 pb-40 sm:pb-60 md:pb-80"
    >
      {/* Same background as the landing, set apart by the rounded top and shadow */}
      <div className="absolute inset-0 bg-[#ececec] -z-10 rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-24px_60px_rgba(0,0,0,0.07)]" />

      <div className="max-w-7xl mx-auto">
        {/* Heading on one line */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] flex flex-wrap gap-x-[0.22em]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Reveal className="font-display italic pb-[0.08em]">Technical</Reveal>
            <Reveal delay={0.1} className="font-medium pb-[0.08em]">skills</Reveal>
          </motion.h2>
          <motion.p className="mt-4 text-base md:text-lg text-black/60" {...fadeIn(0.2)}>
            Quick learner who loves picking up new tools.
          </motion.p>
          <motion.div className="mt-4 inline-block text-sm md:text-base" {...fadeIn(0.3)}>
            <ToolboxLink />
          </motion.div>
        </div>

        {/* Completed courses */}
        <motion.p className={`${LABEL} mb-4`} {...fadeIn()}>
          Completed courses
        </motion.p>
        {degrees.map((degree) => (
          <div key={degree.title} className="grid lg:grid-cols-[16rem_1fr] gap-6 lg:gap-12 border-t border-black/15 py-8 md:py-10">
            <motion.div {...fadeIn()}>
              <h3 className="text-base md:text-lg">{degree.title}</h3>
              <p className="text-sm text-black/50 mt-1">{degree.years}</p>
              <p className="text-sm text-black/50">{degree.place}</p>
            </motion.div>
            <ol className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6">
              {degree.courses.map((course, i) => (
                <motion.li key={course.name} className="flex gap-3" {...fadeIn(0.05 + (i % 3) * 0.06)}>
                  <span className="text-[10px] text-black/35 tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-sm md:text-[15px]">{course.name}</span>
                    <span className="block text-xs md:text-sm text-black/55 mt-0.5 leading-snug">{course.summary}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        ))}

        {/* Languages, frameworks & tools: label and the key for the level bars */}
        <motion.div
          id="toolbox"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-8 md:pt-10 mb-12 md:mb-16"
          {...fadeIn()}
        >
          <p className={LABEL}>Languages, frameworks &amp; tools</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-black/60">
            {Object.values(levels).map((level) => (
              <span key={level.label} className="inline-flex items-center gap-1.5">
                <LevelBars bars={level.bars} className="text-black" />
                {level.label}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Skill tree */}
        <div ref={treeRef} className="relative">
          <svg
            className="absolute inset-0 pointer-events-none hidden lg:block overflow-visible"
            width={tree.width}
            height={tree.height}
            aria-hidden
          >
            {tree.paths.map((path, i) => (
              <motion.path
                key={i}
                d={path.d}
                fill="none"
                stroke="rgba(17,17,17,0.35)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={treeInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 + path.row * 0.35 }}
              />
            ))}
          </svg>

          <div className="flex lg:justify-center mb-12 lg:mb-20">
            <motion.div
              ref={rootRef}
              className="relative bg-black text-white rounded-md px-6 py-3 text-sm uppercase tracking-wider"
              initial={{ opacity: 0, y: 12 }}
              animate={treeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Full-stack developer
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-x-12 gap-y-14 lg:gap-y-20">
            {skillCategories.map((category, i) => (
              <div key={category.title} className="flex flex-col items-start lg:items-center">
                <motion.div
                  ref={(el) => (nodeRefs.current[i] = el)}
                  className="relative bg-[#ececec] border border-black rounded-md px-3.5 py-1.5 text-xs uppercase tracking-wider mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={treeInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.6 + (i % 4) * 0.08 }}
                >
                  {category.title}
                </motion.div>
                <ul className="flex flex-wrap lg:justify-center gap-2">
                  {category.skills.map((skill, j) => (
                    <SkillPill key={skill.name} skill={skill} index={j} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Skills;
