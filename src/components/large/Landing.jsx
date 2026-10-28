import { motion } from "framer-motion";
import { useState } from "react";
import CoderIllustration from "../small/CoderIllustration";
import ScrollLinkLabel from "../small/ScrollLinkLabel";
import { waterfallAnimation } from "../../motion/loadItemAnimation";
import { scrollToCheckpoint } from "../../utils/scrollToCheckpoint";

const EASE = [0.19, 1, 0.22, 1];

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function PersonIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="7" r="4.5" fill="currentColor" />
      <path d="M3 22 C3 16.5 7 13.5 12 13.5 C17 13.5 21 16.5 21 22 Z" fill="currentColor" />
    </svg>
  );
}

function GraduationIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3 L23 8.5 L12 14 L1 8.5 Z" fill="currentColor" />
      <path d="M6 11.8 V16 C6 18 9 19.5 12 19.5 C15 19.5 18 18 18 16 V11.8 L12 14.8 Z" fill="currentColor" />
      <path d="M20.4 9.2 H21.6 V15.5 H20.4 Z" fill="currentColor" />
      <circle cx="21" cy="16.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

// Slides a line of text up from behind a mask
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function SectionLink({ id, label, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToCheckpoint(id);
      }}
      className="block cursor-pointer px-6 py-4 -mx-6 -my-4"
      initial="hidden"
      animate="visible"
      custom={index + 4}
      variants={waterfallAnimation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="block text-[10px] opacity-50">0{index + 1}</span>
      <ScrollLinkLabel label={label} isHovered={isHovered} />
    </motion.a>
  );
}

function Blurb({ icon: Icon, children, delay }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-4 lg:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
      <p className="text-[11px] sm:text-xs lg:text-sm uppercase leading-snug max-w-[18rem]">{children}</p>
    </motion.div>
  );
}

function Landing() {
  return (
    <div className="w-full min-h-screen lg:h-screen relative lg:sticky top-0 flex flex-col px-4 md:px-10 pt-24 md:pt-28 pb-6 lg:pb-[10vh]">
      {/* Name */}
      <h1 className="flex flex-col sm:flex-row justify-center items-center sm:items-end sm:gap-[0.12em] leading-none whitespace-nowrap text-[clamp(4rem,13vw,13rem)] mt-[2vh]">
        <Reveal delay={0.1} className="font-display italic tracking-tight pr-[0.08em] pb-[0.12em]">Albert</Reveal>
        <span className="relative">
          <Reveal delay={0.2} className="font-medium tracking-tight pb-[0.12em]">Hansen</Reveal>
          <Reveal delay={0.5} className="absolute left-full top-0 ml-[0.05em] text-[0.22em] font-medium">
            (DK)
          </Reveal>
        </span>
      </h1>

      {/* Numbered section nav */}
      <nav className="relative z-10 flex justify-center gap-8 sm:gap-16 md:gap-28 mt-8 lg:mt-[5vh]">
        {sections.map((s, i) => (
          <SectionLink key={s.id} {...s} index={i} />
        ))}
      </nav>

      {/* Blurbs + illustration */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-end gap-x-6 gap-y-8 mt-10 lg:mt-0">
        <div className="lg:pb-16 order-2 lg:order-1">
          <Blurb icon={PersonIcon} delay={0.9}>
            I am a 24-year-old developer from Denmark, living in Copenhagen. Social by nature and passionate about software and AI
          </Blurb>
        </div>
        <CoderIllustration className="col-span-2 lg:col-span-1 order-1 lg:order-2 w-full max-w-[460px] lg:w-[min(36vw,50vh)] mx-auto lg:-mb-2 min-w-0" />
        <div className="lg:pb-16 order-3">
          <Blurb icon={GraduationIcon} delay={1}>
            I hold a bachelor's degree in Software from AAU, and I am currently completing my master's in Software Engineering
          </Blurb>
        </div>
      </div>
    </div>
  );
}

export default Landing;
