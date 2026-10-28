import { motion } from "framer-motion";
import Globe from "../small/Globe";

const EASE = [0.19, 1, 0.22, 1];

// Newest first
const education = [
  { years: "2026 – Present", title: "MSc in Engineering (Software)", place: "Aalborg University, Copenhagen" },
  { years: "2023 – 2026", title: "BSc in Software", place: "Aalborg University, Copenhagen" },
  { years: "2018 – 2021", title: "STX, Social Studies & Mathematics", place: "Virum Gymnasium" },
];

// Line that slides up from behind a mask; triggered by the parent heading,
// since the masked line itself never counts as "in view"
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

// Blur-to-sharp fade for body copy
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1, ease: EASE, delay },
});

function About() {
  return (
    <section className="relative z-10 bg-[#e8e8e7] rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-24px_60px_rgba(0,0,0,0.07)] px-4 md:px-10 pt-16 md:pt-28 pb-40 md:pb-48">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start max-w-7xl mx-auto">
        <div>
          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(3.5rem,11vh,6rem)] leading-[0.95] mb-10 lg:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Reveal className="font-display italic pb-[0.08em]">About</Reveal>
            <Reveal delay={0.1} className="font-medium">me</Reveal>
          </motion.h2>

          <div className="space-y-4 text-base md:text-lg lg:text-base leading-relaxed max-w-xl lg:max-w-2xl">
            <motion.p {...fadeIn(0.2)}>
              I am a 24-year-old full-stack developer based in Copenhagen, and I speak both Danish and English. I got hooked the first time I wrote a
              program completely on my own: Minesweeper in C. Thousands of lines, far from pretty, but it worked, and
              the feeling of being able to build something from nothing has stuck with me ever since. I use AI every day, but I read and understand the output, and adjust it or write
              parts myself when needed.
            </motion.p>
            <motion.p {...fadeIn(0.3)}>
              Today I code at Bruun &amp; Hjejle, named Law Firm of the Year at the Chambers Europe Awards
              2026, alongside my master's at AAU. I got a 12
              on my bachelor's project and graduated with a 10.3 average. Along the way I've built websites for
              friends, joined an international Erasmus+ project with universities around the world, and served as a
              guardsman in the Royal Life Guards.
            </motion.p>
            <motion.p {...fadeIn(0.4)}>
              I'm self-driven, but I do my best work with others; sparring and an agile mindset are what create real
              quality. Off the keyboard you'll find me with my girlfriend and friends, playing football, chess or
              guitar. I'm always open to new opportunities, so feel free to reach out.
            </motion.p>
          </div>
        </div>

        <div className="w-full max-w-[560px] lg:max-w-[min(560px,44vh)] mx-auto">
          <Globe />

          <div className="mt-8">
            <motion.h3 className="text-[10px] uppercase tracking-wider text-black/50 mb-3" {...fadeIn()}>
              Education
            </motion.h3>
            <ol>
              {education.map((item, i) => (
                <motion.li
                  key={i}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-black/15 py-3"
                  {...fadeIn(0.1 + i * 0.1)}
                >
                  <span className="text-xs opacity-50 pt-0.5 tabular-nums">{item.years}</span>
                  <span>
                    <span className="block text-sm md:text-base">{item.title}</span>
                    <span className="block text-xs opacity-60 mt-0.5">{item.place}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
