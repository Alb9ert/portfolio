import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projectsByDate } from "../../data/projectData";
import { searchProjects } from "../../utils/projectSearch";
import { Star } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1];
const projects = projectsByDate;

// Wraps the parts of `text` that match any search term in a highlight.
// Short terms like "ai" only match whole words so they don't light up inside other words
function Highlight({ text, terms }) {
  if (!terms.length) return text;
  const escape = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(${terms.map((t) => (t.length <= 3 ? `\\b${escape(t)}\\b` : escape(t))).join("|")})`,
    "gi",
  );
  return text.split(pattern).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="bg-black text-[#e8e8e7] rounded-[3px] px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

// Heading line that slides up from behind a mask; triggered by the parent heading
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%" },
          visible: { y: 0, transition: { duration: 1.1, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ProjectRow({ project, terms }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group relative border-t border-black/15 cursor-pointer"
    >
      <div className="grid md:grid-cols-[2.5rem_14rem_1fr_auto] items-start md:items-center gap-x-8 gap-y-2 py-5 md:py-6">
        <span className="hidden md:block text-xs text-black/40 tabular-nums">
          {project.number}
        </span>

        {/* The link stretches over the whole row */}
        <span className="flex items-baseline justify-between gap-3">
          {/* No transform on the link itself, or its overlay would shrink to the title */}
          <Link
            to={`/project/${project.id}`}
            className="text-2xl md:text-3xl font-medium after:absolute after:inset-0"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
              <Highlight text={project.title} terms={terms} />
              {project.stared && (
                <Star
                  size={18}
                  strokeWidth={1.8}
                  aria-label="Featured project"
                  className="inline-block shrink-0 ml-2 mb-1"
                />
              )}{" "}
            </span>
            {project.type && (
              <span className="block text-xs font-normal text-black/50 mt-1">
                <Highlight text={project.type} terms={terms} />
              </span>
            )}
          </Link>
          <span className="md:hidden text-xs text-black/50 tabular-nums">
            {project.year}
          </span>
        </span>

        <span>
          <span className="block text-sm text-black/60 leading-snug">
            <Highlight text={project.description} terms={terms} />
          </span>
          {/* Key features as plain labels; clicks fall through to the row link */}
          <span className="flex flex-wrap gap-1.5 mt-3">
            {(project.features ?? []).map((feature) => (
              <span
                key={feature}
                className="text-[11px] rounded-full border border-black/15 px-2.5 py-0.5 text-black/60"
              >
                <Highlight text={feature} terms={terms} />
              </span>
            ))}
          </span>
        </span>

        <span className="hidden md:flex items-center gap-4 text-sm text-black/50 tabular-nums">
          {project.year}
          <span className="text-lg text-black transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </span>
      </div>
    </motion.li>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  // Scroll progress for the card slide-up effect
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Card slide-up effect - starts just below and slides up to cover
  const y = useTransform(sectionProgress, [0, 1], [100, 0]);

  // "/" focuses the search from anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { results, highlights: terms } = searchProjects(projects, query);

  return (
    <motion.div
      ref={sectionRef}
      style={{ y }}
      className="w-full relative z-10 min-h-screen -mt-24 px-4 md:px-10 pt-16 md:pt-28 pb-40 md:pb-56"
    >
      <div className="absolute inset-0 bg-[#e8e8e7] -z-10 rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-24px_60px_rgba(0,0,0,0.07)]" />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] flex flex-wrap gap-x-[0.22em] mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <Reveal className="font-display italic pb-[0.08em]">Selected</Reveal>
          <Reveal delay={0.1} className="font-medium pb-[0.08em]">
            projects
          </Reveal>
        </motion.h2>

        {/* Search */}
        <div className="flex items-end gap-4 border-b-2 border-black pb-3 mb-2">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-7 md:h-7 mb-1 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Try “AI projects with a database”"
            aria-label="Search projects"
            className="flex-1 min-w-0 bg-transparent text-2xl md:text-4xl outline-none placeholder:text-black/25"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="text-xs uppercase tracking-wider text-black/50 hover:text-black mb-2 cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden md:block text-xs text-black/40 border border-black/20 rounded px-1.5 py-0.5 mb-2">
              /
            </kbd>
          )}
        </div>
        <p className="text-xs text-black/50 mb-6 tabular-nums">
          {results.length === projects.length
            ? `${projects.length} projects`
            : `${results.length} of ${projects.length} projects`}
        </p>

        {/* Results */}
        <ul className="border-b border-black/15">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((project) => (
              <ProjectRow key={project.id} project={project} terms={terms} />
            ))}
          </AnimatePresence>
          {results.length === 0 && (
            <li className="py-10 text-black/50">
              Nothing matches “{query}”.{" "}
              <button
                onClick={() => setQuery("")}
                className="underline underline-offset-4 hover:text-black cursor-pointer"
              >
                Show all projects
              </button>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
}

export default Projects;
