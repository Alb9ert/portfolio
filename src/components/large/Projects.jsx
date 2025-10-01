import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Projects() {
    const sectionRef = useRef(null);

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
            className="w-full pt-5 relative z-10 min-h-screen -mt-24 px-14"
        >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-[#ececec] -z-10" />
            
            <div className="py-20 font-medium text-8xl relative overflow-hidden">
                <motion.h1
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                >
                    PROJECTS
                </motion.h1>
                <motion.h1
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    AND CONTRIBUTIONS
                </motion.h1>
            </div>
        </motion.div>
    );
}

export default Projects;