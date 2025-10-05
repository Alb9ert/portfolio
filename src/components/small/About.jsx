import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function About() {
    const aboutRef = useRef(null);
    const isInView = useInView(aboutRef, { once: true, margin: "-50px" });

    return (
        <motion.div 
            ref={aboutRef}
            className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 sm:py-12 md:py-16 lg:py-20 relative pt-8 sm:pt-30 md:pt-16 xl:pt-45"
            style={{ minHeight: 'calc(100vh - 135px)' }}
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        y: 0,
                    }
                    : {
                        opacity: 0,
                        y: 20,
                    }
            }
            transition={{
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.1,
            }}
        >
            <h1 className="text-center sm:text-left text-sm sm:text-base md:text-lg ml-0 sm:ml-1 font-arcade mb-2 sm:mb-3 font-medium text-arcade">Hello, my name is</h1>
            <motion.h1 
                className="text-center sm:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2 font-semibold leading-tight"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true }}
            >
                Albert Hansen
            </motion.h1>
            <motion.h1 
                className="text-center sm:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 sm:mb-10 md:mb-12 lg:mb-14 leading-tight"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true }}
            >
                Aspiring Software Engineer
            </motion.h1>
            <p className="text-center sm:text-left text-sm sm:text-lg md:text-xl xl:text-2xl mb-2 leading-relaxed px-8 sm:px-0">I'm a software engineering student based in Copenhagen with a strong passion for development and problem-solving. I enjoy working on both personal projects and large-scale organizational workflows that require collaboration, creativity, and an agile mindset.<br /> <br />
            Take a look around to explore my work, and discover some of the projects I’ve built — with many more still in progress! Feel free to contact me if you have any questions or want to work together.</p>
        
        </motion.div>
    );
}

export default About;