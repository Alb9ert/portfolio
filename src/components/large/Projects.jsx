import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "../small/ProjectCard";
import booklyFront from "../../assets/projects/booklyFront.png";
import booklyFrontTwo from "../../assets/projects/booklyFront.jpg";
import cookaiFront from "../../assets/projects/cookaiFront.png";
import cookaiFrontTwo from "../../assets/projects/cookaiFront2.jpg";
import cybermatchFront from "../../assets/projects/cybermatchFront.png";
import cybermatchFrontTwo from "../../assets/projects/cybermatchFront2.png";
import pseudomatFront from "../../assets/projects/pseudomatFront.png";
import pseudomatFrontTwo from "../../assets/projects/pseudomatFront2.png";

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
            className="w-full pt-5 relative z-10 min-h-screen -mt-24 px-4 sm:px-8 md:px-10 lg:px-14 pb-20 sm:pb-32 md:pb-40 lg:pb-50"
        >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-white -z-10" />
            
            <div className="py-10 sm:py-16 md:py-20 font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl relative overflow-hidden">
                <motion.h1
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="leading-tight"
                >
                    PROJECTS
                </motion.h1>
                <motion.h1
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="text-center leading-tight"
                >
                    AND CONTRIBUTIONS
                </motion.h1>
                <div className="w-full mt-10 sm:mt-16 md:mt-20 lg:mt-25 flex flex-col gap-y-12 sm:gap-y-20 md:gap-y-28 lg:gap-y-35 px-0 sm:px-4 md:px-8 max-w-3xl md:max-w-none mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-0 md:gap-x-8 lg:gap-x-16">
                    <ProjectCard title="Bookly" description="A book recommendation system" image={booklyFrontTwo} link="https://bookly.com" number="(01)" date="Finished 2025." projectId="bookly" />
                    <ProjectCard title="Bookly" description="A book recommendation system" image={booklyFront} link="https://bookly.com" number="(01)" date="Finished 2025." projectId="bookly" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-0 md:gap-x-8 lg:gap-x-16">
                    <ProjectCard title="CookAI" description="A recipe recommendation system" image={cookaiFrontTwo} link="https://cookai.com" number="(02)" date="Finished 2024." projectId="cookai" />
                    <ProjectCard title="CookAI" description="A recipe recommendation system" image={cookaiFront} link="https://cookai.com" number="(02)" date="Finished 2024." projectId="cookai" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-0 md:gap-x-8 lg:gap-x-16">
                    <ProjectCard title="CyberMatch" description="A cyber security company website" image={cybermatchFrontTwo} link="https://cybermatch.com" number="(03)" date="Finished 2024." projectId="cybermatch" />
                    <ProjectCard title="" description="A cyber security company website" image={cybermatchFront} link="https://cybermatch.com" number="" date="Finished 2024." projectId="cybermatch" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-0 md:gap-x-8 lg:gap-x-16">
                    <ProjectCard title="PseudoMat" description="A pseudomat website" image={pseudomatFrontTwo} link="https://pseudomat.com" number="(04)" date="Finished 2024." projectId="pseudomat" />
                    <ProjectCard title="PseudoMat" description="A pseudomat website" image={pseudomatFront} link="https://pseudomat.com" number="(04)" date="Finished 2024." projectId="pseudomat" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Projects;