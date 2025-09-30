export const waterfallAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
      transition: {
        opacity: {
          duration: 0.15, // Very quick, subtle fade-in
          ease: "easeOut",
          delay: i * 0.08,
        },
        y: {
          duration: 0.5, // Slower slide-up motion
          ease: [0.19, 1, 0.22, 1], // Same easing as sliding text
          delay: i * 0.08,
        },
      },
  }),
};

// Blur to clear animation
export const blurInAnimation = {
  hidden: {
    opacity: 0,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

// Smooth floating animation for scroll indicator
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};
    