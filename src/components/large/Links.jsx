import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import albertImg from "../../assets/albert.jpg";

function LinkItem({ href, label, number, index }) {
    return (
        <motion.a 
            href={href} 
            className="text-xl font-medium py-2 border-b border-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.6, 
                ease: [0.19, 1, 0.22, 1],
                delay: index * 0.1
            }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <span className="mr-5 text-gray-500">{number}</span> {label}
        </motion.a>
    );
}

function Links() {
    const imageRef = useRef(null);
    const isInView = useInView(imageRef, { once: true, margin: "-50px" });

    return (
        <div>
        <div className="py-10 pb-70 justify-center w-full h-screen relative z-20 bg-[#ececec] flex jutify-between gap-x-32 px-4">
            <div>
                <motion.img 
                    ref={imageRef}
                    src={albertImg} 
                    alt="albert" 
                    className="w-full h-3/4 object-cover rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.15)] mb-5 mt-10" 
                    loading="lazy"
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
                <div className="flex flex-col gap-y-5">
                <LinkItem href="https://www.linkedin.com/in/albert-zaharie-b5313125a/" label="LinkedIn" number="(01)" index={0} />
                <LinkItem href="https://github.com/albertzaharie" label="GitHub" number="(02)" index={1} />
                    <LinkItem href="#" label="Email" number="(03)" index={2} />
                    <LinkItem href="#" label="Newest project" number="(04)" index={3} />
                </div>


            </div>
            <div className="w-3/5">
                <div className="mt-20">
                    <motion.h1 
                        className="font-medium text-7xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.19, 1, 0.22, 1],
                            delay: 0.2
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        &nbsp; &nbsp; &nbsp; I am always looking for new opportunities to work on interesting projects.
                    </motion.h1>
                    <br />
                    <br />
                    <motion.h1 
                        className="font-medium text-7xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.19, 1, 0.22, 1],
                            delay: 0.4
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        Feel free to contact me if you have any questions or want to work together.
                    </motion.h1>
                </div>
            </div>
        </div>
        <div className="h-50 justify-center w-full relative z-20 bg-[#ececec] flex jutify-between"></div>

        </div>
    );
}

export default Links;