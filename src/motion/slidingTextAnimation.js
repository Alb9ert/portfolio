export const slidingTextVariants = {
  firstText: {
    initial: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.725,
        ease: [0.19, 1, 0.22, 1],
      },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.725,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  },
  secondText: {
    initial: {
      y: 20,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.725,
        ease: [0.19, 1, 0.22, 1],
      },
    },
    animate: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.725,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  },
};
