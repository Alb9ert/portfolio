import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siLinkedin, siGithub } from "simple-icons";
import albertImg from "../../assets/albert.jpg";

const EASE = [0.19, 1, 0.22, 1];
const EMAIL = "alberthansendev@outlook.com";

const LABEL = "text-[10px] uppercase tracking-wider text-black/50";

const links = [
  { label: "LinkedIn", detail: "Albert Agner Hansen", href: "https://www.linkedin.com/in/albert-agner-hansen-2a8397244/", icon: siLinkedin },
  { label: "GitHub", detail: "@Alb9ert", href: "https://github.com/Alb9ert", icon: siGithub },
  { label: "Email", detail: EMAIL, href: `mailto:${EMAIL}`, glyph: "mail" },
  { label: "Newest project", detail: "BoligBot", href: "https://boligbot.vercel.app/", glyph: "spark" },
];

// Line symbols for links without a brand logo
const GLYPHS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
};

// Blur-to-sharp fade used across the site
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1, ease: EASE, delay },
});

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

function LinkRow({ link, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const external = !link.href.startsWith("mailto:");

  return (
    <motion.li className="border-t border-black/15" {...fadeIn(0.1 + index * 0.06)}>
      <a
        href={link.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="grid grid-cols-[2rem_1.5rem_1fr_auto] items-center gap-3 py-4 md:py-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-[10px] text-black/35 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        {link.icon ? (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden>
            <path d={link.icon.path} fill={`#${link.icon.hex}`} />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {GLYPHS[link.glyph]}
          </svg>
        )}
        <span className="flex flex-wrap items-baseline gap-x-3 min-w-0">
          <span className="text-lg md:text-xl">{link.label}</span>
          <span className="text-sm text-black/45 truncate">{link.detail}</span>
        </span>
        <motion.span
          className="text-lg"
          animate={{ x: isHovered ? 3 : 0, y: isHovered ? -3 : 0, opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-hidden
        >
          ↗
        </motion.span>
      </a>
    </motion.li>
  );
}

// Big email address with a copy button next to it
function EmailBlock() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return; // Clipboard blocked (e.g. insecure context); the mailto link still works
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div className="flex flex-wrap items-center gap-x-5 gap-y-3" {...fadeIn(0.2)}>
      <a
        href={`mailto:${EMAIL}`}
        className="block text-xl sm:text-2xl md:text-3xl font-medium break-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {EMAIL}
        {/* Underline like the landing nav links: faint at rest, fills on hover */}
        <span className="relative block h-px mt-1 bg-black/15">
          <motion.span
            className="absolute inset-y-0 left-0 bg-black"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </span>
      </a>
      <button
        onClick={copy}
        className="relative overflow-hidden rounded-full border border-black/20 hover:border-black px-4 py-1.5 text-xs uppercase tracking-wider transition-colors cursor-pointer"
      >
        <motion.span className="block" animate={{ y: copied ? "-150%" : 0 }} transition={{ duration: 0.4, ease: EASE }}>
          Copy
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "150%" }}
          animate={{ y: copied ? 0 : "150%" }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-live="polite"
        >
          Copied ✓
        </motion.span>
      </button>
    </motion.div>
  );
}

// Live local time in Copenhagen, so visitors know my time zone at a glance
function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}

function Links() {
  return (
    <div className="relative z-30 px-4 sm:px-8 md:px-10 pt-20 md:pt-28 pb-24 md:pb-32">
      {/* Own card: rounded top over Projects, rounded bottom resting on the photo section below */}
      <div className="absolute inset-0 bg-[#ececec] -z-10 rounded-[2rem] md:rounded-[3rem] shadow-[0_-24px_60px_rgba(0,0,0,0.07),0_24px_60px_rgba(0,0,0,0.1)]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-20 items-start">
        <div>
          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl leading-[0.95] flex flex-wrap gap-x-[0.22em] mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Reveal className="font-display italic pb-[0.08em]">Let's</Reveal>
            <Reveal delay={0.1} className="font-medium pb-[0.08em]">talk</Reveal>
          </motion.h2>

          <motion.p className="text-base md:text-lg text-black/60 max-w-xl mb-10" {...fadeIn(0.1)}>
            I'm always looking for new opportunities to work on interesting projects. Feel free to reach out if you have
            any questions or want to work together.
          </motion.p>

          <EmailBlock />

          <ul className="mt-12 border-b border-black/15">
            {links.map((link, i) => (
              <LinkRow key={link.label} link={link} index={i} />
            ))}
          </ul>
        </div>

        <motion.figure className="lg:mt-4" {...fadeIn(0.2)}>
          <div className="overflow-hidden rounded-xl">
            <img src={albertImg} alt="Albert Hansen" className="w-full aspect-square object-cover object-top" />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </span>
            <span className="text-black/50">
              Copenhagen, DK · <LocalTime /> <span className={LABEL}>local time</span>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </div>
  );
}

export default Links;
