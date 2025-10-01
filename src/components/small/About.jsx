import { motion } from "framer-motion";
import { blurInAnimation, floatingAnimation } from "../../motion/loadItemAnimation";

function About() {
    return (
        <motion.div 
            className="px-85 py-20 relative"
            style={{ minHeight: 'calc(100vh - 135px)' }}
            initial="hidden"
            animate="visible"
            variants={blurInAnimation}
        >
            <h1 className="text-lg ml-1 font-arcade mb-3 font-medium text-arcade">Hello, my name is</h1>
            <h1 className="text-6xl mb-2 font-semibold">Albert Hansen</h1>
            <h1 className="text-6xl font-semibold mb-14">I love writing code!</h1>
            <p className="text-xl mb-2">I am an software engineering student based in Denmark, with an eye for development. I love working on personal projects as well as big organizational projects that requires teamwork and an agile approach. <br /> <br />Check out my page and gain an insight of what I have to offer, as well as have some fun with some old projects I have made with plenty still in the works!</p>
        
        </motion.div>
    );
}

export default About;