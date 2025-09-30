import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Skillbar from "./Skillbar";
import reactImg from "../assets/barImages/ReactBar.avif";
import reactLogo from "../assets/logos/react.png";
import javascriptImg from "../assets/barImages/javascriptBar.avif";
import javascriptLogo from "../assets/logos/javascript.png";
import PostgresImg from "../assets/barImages/PostgresBar.avif";
import PostgresLogo from "../assets/logos/postgresql.png";
import ExpressBar from "../assets/barImages/ExpressBar.avif";
import ExpressLogo from "../assets/logos/express.png";
import SpringbootBar from "../assets/barImages/SpringbootBar.avif";
import SpringbootLogo from "../assets/logos/springboot.png";
import gitLogo from "../assets/logos/git.svg";
import gitImg from "../assets/barImages/gitBar.avif";
import mongodbLogo from "../assets/logos/mongodb.png";
import mongodbImg from "../assets/barImages/mongoBar.avif";
import cssImg from "../assets/barImages/cssBar.avif";
import cssLogo from "../assets/logos/css.svg";

function Skills() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    
    // Scroll progress for the card slide-up effect
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });
    
    // Scroll progress for horizontal skill bar scrolling
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Card slide-up effect - starts just below and slides up to cover
    const y = useTransform(sectionProgress, [0, 1], [100, 0]);
    
    // Calculate how much to translate based on scroll (8 items * 256px width + 32px gap * 7)
    // Should scroll to show the last items, accounting for viewport width
    const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div 
            ref={sectionRef}
            style={{ y }}
            className="w-full pt-5 relative z-10 min-h-screen -mt-24"
        >
            {/* Solid background layer */}
            <div className="absolute inset-0 bg-[#ececec] -z-10" />
            {/* Arcade green overlay */}
            <div className="absolute inset-0 bg-arcadegreen -z-10" />
            
            <div className="px-14 py-20 font-medium text-9xl relative overflow-hidden">
                <motion.h1
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                >
                    TECHNICAL SKILLS
                </motion.h1>
                <motion.h1
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                >
                    AND TOOLS
                </motion.h1>
            </div>
            
            {/* Horizontal scroll container - creates tall space for vertical scrolling */}
            <div ref={containerRef} className="relative h-[200vh]">
                <div className="sticky top-20 h-screen flex flex-col items-start pt-10 overflow-hidden">
                    <div className="w-full px-14 bg-arcadegreen-dark py-10">
                        <motion.div 
                            className="flex gap-8"
                            style={{ x }}
                        >
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={ExpressBar} logo={reactLogo} name="React js" proficiency={80} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={javascriptImg} logo={javascriptLogo} name="Javascript" proficiency={100} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={PostgresImg} logo={PostgresLogo} name="PostgreSQL" proficiency={60} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={reactImg} logo={ExpressLogo} name="Express js" proficiency={80} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={SpringbootBar} logo={SpringbootLogo} name="SpringBoot" proficiency={40} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={gitImg} logo={gitLogo} name="Git" proficiency={80} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={mongodbImg} logo={mongodbLogo} name="MongoDB" proficiency={80} /></div>
                            <div className="w-64 flex-shrink-0"><Skillbar backgroundImg={cssImg} logo={cssLogo} name="CSS" proficiency={90} /></div>
                        </motion.div>
                    </div>
                    
                    {/* Progress bar - directly below skill bars */}
                    <motion.div 
                        className="w-full px-14 mt-8"
                    >
                        <motion.div 
                            className="h-1.5 origin-left"
                            style={{ scaleX, backgroundColor: '#0f574f17 ' }}
                        />
                    </motion.div>
                </div>
            </div>
            
            {/* Test spacing and text */}
            <div className="h-96"></div>
            <p className="px-14 text-4xl pb-20">hi</p>
        </motion.div>
    );
}

export default Skills;