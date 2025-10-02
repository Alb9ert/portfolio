import { motion } from "framer-motion";
import { useState } from "react";
import { waterfallAnimation } from "../../motion/loadItemAnimation";
import { slidingTextVariants } from "../../motion/slidingTextAnimation";

// Smooth scroll function
const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

function NavItem({ href, label, index }) {
  const handleClick = (e) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    smoothScrollTo(elementId);
  };

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      custom={index}
      variants={waterfallAnimation}
    >
      <motion.a 
        href={href} 
        onClick={handleClick}
        className="leading-tight font-medium block relative overflow-hidden cursor-pointer"
        initial="initial"
        whileHover="hover"
        animate="animate"
      >
        <motion.span 
          variants={slidingTextVariants.firstText} 
          className="block"
        >
          {label}
        </motion.span>
        <motion.span
          variants={slidingTextVariants.secondText}
          className="absolute top-0 left-0 block"
          aria-hidden
        >
          {label}
        </motion.span>
      </motion.a>
    </motion.li>
  );
}

function ContactButton({ href, label, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    smoothScrollTo(elementId);
  };

  return (
     <motion.li 
        className="list-none text-base leading-tight px-7 py-3 bg-black rounded-full bg-black text-white cursor-pointer"
        initial="hidden"
        animate="visible"
        custom={index}
        variants={waterfallAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
     >
      <motion.a 
        href={href} 
        onClick={handleClick}
        className="leading-tight font-medium block relative overflow-hidden"
        initial="initial"
        animate={isHovered ? "hover" : "animate"}
      >
        <motion.span 
          variants={slidingTextVariants.firstText} 
          className="block"
        >
          {label}
        </motion.span>
        <motion.span
          variants={slidingTextVariants.secondText}
          className="absolute top-0 left-0 block"
          aria-hidden
        >
          {label}
        </motion.span>
      </motion.a>
    </motion.li>
  );
}

function Navbar() {
  return (
    <nav className="px-14 py-7 flex items-center justify-between font-medium">
      {/* Left section */}
      <motion.div 
        className="flex-1 flex justify-start"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={waterfallAnimation}
      >
        <a className="text-5xl leading-tight" href="/">(01) Portfolio</a>
      </motion.div>
      
      {/* Middle section */}
      <div className="flex-1 flex justify-end mr-68">
        <ul className="flex space-x-6 justify-end">
          <NavItem href="#about" label="ABOUT" index={1} />
          <NavItem href="#skills" label="SKILLS" index={2} />
          <NavItem href="#projects" label="PROJECTS" index={3} />
          <NavItem href="#contact" label="LINKS" index={4} />
        </ul>
      </div>
      
      {/* Right section */}
      <div className="flex justify-end">
        <ContactButton href="#contact" label="CONTACT ME" index={5} />
      </div>
    </nav>
  );
}

export default Navbar;