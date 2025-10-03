import { motion } from "framer-motion";
import About from '../small/About';
import { floatingAnimation } from "../../motion/loadItemAnimation";

function Landing() {
  return (
    <div className="w-full h-screen relative sticky top-0 pt-[88px] xl:pt-0">
        <About/>
        <motion.p 
            className="absolute bottom-10 right-14 text-sm opacity-60"
            variants={floatingAnimation}
            animate="animate"
        >
            (SCROLL DOWN)
        </motion.p>
    </div>
  );
}

export default Landing;