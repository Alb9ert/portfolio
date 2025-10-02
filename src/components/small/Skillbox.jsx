import { motion } from "framer-motion";

function Skillbox({ skills, title }) {
  return (
    <motion.div 
      className="flex-1 p-8 border-2 border-black/20 rounded-lg bg-white/40 backdrop-blur-sm bg-arcadegreen shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <h2 className="font-medium text-xl mb-6 pb-3 border-b-2 border-black/30 uppercase tracking-wide">
        {title}
      </h2>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <motion.li 
            key={index}
            className="text-lg font-medium opacity-80 flex items-start"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <span className="mr-3 text-black/60">•</span>
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Skillbox;
