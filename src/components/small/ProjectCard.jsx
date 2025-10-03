import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const slidingTextVariants = {
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

function ProjectCard( { title, image, link, number, date, projectId } ) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <Link to={`/project/${projectId}`} className="block">
            <motion.div 
                ref={ref}
                className="w-full h-full flex-col group cursor-pointer"
                initial="initial"
                whileHover="hover"
                animate="animate"
            >
            <motion.img 
                className="shadow-[0_0_16px_rgba(0,0,0,0.15)] w-full h-auto" 
                src={image} 
                alt={title}
                loading="eager"
                decoding="async"
                style={{
                    imageRendering: '-webkit-optimize-contrast'
                }}
                initial={{ 
                    opacity: 0,
                    y: 20
                }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 20
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.1
                }}
            />
            <div className="px-1 flex justify-between text-base font-weight-500 mt-3">
                <p className="font-medium">{number}{number && "\u00A0\u00A0\u00A0"}{title}</p>
                <div className="relative overflow-hidden">
                    <motion.span 
                        variants={slidingTextVariants.firstText}
                        className="block"
                    >
                        {date}
                    </motion.span>
                    <motion.span
                        variants={slidingTextVariants.secondText}
                        className="absolute top-0 left-0 block whitespace-nowrap"
                        aria-hidden
                    >
                        View Project &rarr;
                    </motion.span>
                </div>
            </div>
        </motion.div>
        </Link>
    );
}

export default ProjectCard;