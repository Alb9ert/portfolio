import { motion } from "framer-motion";
import { slidingTextVariants } from "../../motion/slidingTextAnimation";

const EASE = [0.19, 1, 0.22, 1];

// Arrow shapes and the direction each one nudges on hover
const ARROWS = {
  down: { d: "M6 1.5 V10.5 M2.5 7 L6 10.5 L9.5 7", nudge: { y: 2 } },
  right: { d: "M1.5 6 H10.5 M7 2.5 L10.5 6 L7 9.5", nudge: { x: 3 } },
  left: { d: "M10.5 6 H1.5 M5 2.5 L1.5 6 L5 9.5", nudge: { x: -3 } },
};

// Label for in-page links: sliding text, an arrow and an underline that fills on
// hover. The parent owns the hover state so its whole clickable area can trigger
// the animation. A left arrow sits before the text, the others after it.
function ScrollLinkLabel({ label, isHovered, direction = "down", className = "text-sm md:text-base" }) {
  const arrow = ARROWS[direction];
  const rest = Object.fromEntries(Object.keys(arrow.nudge).map((k) => [k, 0]));
  const arrowIcon = (
    <motion.svg
      viewBox="0 0 12 12"
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ ...(isHovered ? arrow.nudge : rest), opacity: isHovered ? 1 : 0.5 }}
      transition={{ duration: 0.4, ease: EASE }}
      aria-hidden
    >
      <path d={arrow.d} />
    </motion.svg>
  );

  return (
    <>
      <span className={`flex items-center gap-1.5 ${className}`}>
        {direction === "left" && arrowIcon}
        <motion.span className="block relative overflow-hidden" initial="initial" animate={isHovered ? "hover" : "animate"}>
          <motion.span variants={slidingTextVariants.firstText} className="block">
            {label}
          </motion.span>
          <motion.span variants={slidingTextVariants.secondText} className="absolute top-0 left-0 block" aria-hidden>
            {label}
          </motion.span>
        </motion.span>
        {direction !== "left" && arrowIcon}
      </span>
      {/* Underline: faint at rest, fills on hover */}
      <span className="relative block h-px mt-1 bg-black/15">
        <motion.span
          className="absolute inset-y-0 left-0 bg-black"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </span>
    </>
  );
}

export default ScrollLinkLabel;
