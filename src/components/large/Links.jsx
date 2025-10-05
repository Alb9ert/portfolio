import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import albertImg from "../../assets/albert.jpg";

function LinkItem({ href, label, number, index }) {
  const linkRef = useRef(null);
  const isInView = useInView(linkRef, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-base sm:text-lg md:text-xl font-base py-2 border-b border-gray-400 block px-2 -mx-2 rounded"
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
      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
      transition={{
        duration: 0.1,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.0 + index * 0.00,
      }}
    >
      <span className="mr-3 sm:mr-5 text-gray-500">{number}</span> {label}
    </motion.a>
  );
}

function Links() {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, margin: "-50px" });

  return (
    <div>
      <div className="py-10 sm:py-16 md:py-20 pb-20 sm:pb-40 md:pb-70 justify-center w-full min-h-screen md:h-screen relative z-20 bg-[#ececec] flex flex-col md:flex-row justify-between gap-y-12 md:gap-x-12 lg:gap-x-20 px-4 sm:px-8 md:px-10">
        <div className="w-full md:w-2/6">
          <h2 className="text-center font-medium text-base sm:text-lg mb-6 sm:mb-8 md:hidden">(LINKS)</h2>
          <motion.img
            ref={imageRef}
            src={albertImg}
            alt="albert"
            className="w-full max-w-md md:max-w-none mx-auto md:mx-0 h-64 sm:h-80 md:h-2/3 object-cover rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.15)] mb-5 mt-0 sm:mt-5 md:mt-10"
            loading="eager"
            decoding="async"
            style={{
              imageRendering: "-webkit-optimize-contrast",
            }}
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
          />
          <div className="flex flex-col gap-y-4 sm:gap-y-5 max-w-md md:max-w-none mx-auto md:mx-0">
            <LinkItem
              href="https://www.linkedin.com/in/albert-agner-hansen-2a8397244/"
              label="LinkedIn"
              number="(01)"
              index={0}
              className="border-top border-gray-400 pt-2"
            />
            <LinkItem
              href="https://github.com/Alb9ert"
              label="GitHub"
              number="(02)"
              index={1}
            />
            <LinkItem
              href="mailto:alberthansendev@outlook.com"
              label="Email"
              number="(03)"
              index={2}
            />
            <LinkItem href="" label="Newest project" number="(04)" index={3} />
          </div>
        </div>
        <div className="w-full md:w-4/6">
          <div className="mt-0 sm:mt-10 md:mt-20">
            <motion.h1
              className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.1,
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              I am always looking for new opportunities to
              work on interesting projects.
            </motion.h1>
            <br />
            <br />
            <motion.h1
              className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2,
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Feel free to contact me if you have any questions or want to work
              together.
            </motion.h1>
          </div>
        </div>
      </div>
      <div className="h-16 sm:h-24 md:h-32 justify-center w-full z-20 bg-[#ececec]"></div>
    </div>
  );
}

export default Links;
