import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Skillbar from "../small/Skillbar";
import Skillbox from "../small/Skillbox";

import reactImg from "../../assets/barImages/ReactBar.avif";
import reactLogo from "../../assets/logos/react.png";
import javascriptImg from "../../assets/barImages/javascriptBar.avif";
import javascriptLogo from "../../assets/logos/javascript.png";
import PostgresImg from "../../assets/barImages/PostgresBar.avif";
import PostgresLogo from "../../assets/logos/postgresql.png";
import ExpressBar from "../../assets/barImages/ExpressBar.avif";
import ExpressLogo from "../../assets/logos/express.png";
import SpringbootBar from "../../assets/barImages/SpringbootBar.avif";
import SpringbootLogo from "../../assets/logos/springboot.png";
import gitLogo from "../../assets/logos/git.svg";
import gitImg from "../../assets/barImages/gitBar.avif";
import mongodbLogo from "../../assets/logos/mongodb.png";
import mongodbImg from "../../assets/barImages/mongoBar.avif";
import cssImg from "../../assets/barImages/cssBar.avif";
import cssLogo from "../../assets/logos/css.png";

function Skills() {
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
      {/* Arcade green overlay */}
      <div className="absolute inset-0 bg-arcadegreen -z-10" />

      <div className=" py-20 font-medium text-8xl relative overflow-hidden">
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

      <div className="flex grid grid-cols-2 gap-x-8 gap-y-14">
        {/* Pair 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={reactLogo}
            name="React js"
            proficiency={80}
            logoSize="w-3/4"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={javascriptLogo}
            name="Javascript / Typescript"
            proficiency={100}
            logoSize="w-2/3"
          />
        </motion.div>

        {/* Pair 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={PostgresLogo}
            name="PostgreSQL"
            proficiency={60}
            logoSize="w-3/5"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={ExpressLogo}
            name="Express js"
            proficiency={80}
            logoSize="w-3/4"
          />
        </motion.div>

        {/* Pair 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={SpringbootLogo}
            name="SpringBoot"
            proficiency={40}
            logoSize="w-3/4"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={gitLogo}
            name="Git / Github"
            proficiency={80}
            logoSize="w-3/4"
          />
        </motion.div>

        {/* Pair 4 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={mongodbLogo}
            name="MongoDB"
            proficiency={80}
            logoSize="w-4/5"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skillbar
            logo={cssLogo}
            name="CSS / Tailwind"
            proficiency={90}
            logoSize="w-5/6"
          />
        </motion.div>
       </div>
       
       <motion.p 
         className="mt-32 mb-5 text-m opacity-60 ml-10 tracking-wide"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
         viewport={{ once: true }}
       >
         ADDITIONALLY
       </motion.p>
       
       <div className="flex gap-6 pb-80">
        <Skillbox
          title="Programming languages"
          skills={[
            "Java",
            "Python",
            "C",
            "VBA",
            "MIPS assembly",
            "Ocaml",
            "SQL",
            "HTML",
          ]}
        />
        <Skillbox
          title="Frameworks, Libraries & Tools"
          skills={[
            "React query",
            "React router",
            "DaisyUI",
            "Framer motion",
            "Mongoose",
            "OpenAI",
            "Affinda AI",
            "Jest",
            "Github workflows",
          ]}
        />
        <Skillbox
          title="Methodologies & Soft Skills"
          skills={[
            "Agile programming",
            "Scrum",
            "Problem based learning",
            "Teamwork",
            "IT Support",
          ]}
        />
      </div>
    </motion.div>
  );
}

export default Skills;
