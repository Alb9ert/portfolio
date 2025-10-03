import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { waterfallAnimation } from "../../motion/loadItemAnimation";
import { slidingTextVariants } from "../../motion/slidingTextAnimation";
import { getLenis } from "../../App";

// Simple checkpoint scroll function using Lenis
const scrollToCheckpoint = (checkpoint) => {
  const lenis = getLenis();
  
  switch(checkpoint) {
    case 'about':
      if (lenis) {
        lenis.scrollTo(0, { offset: 0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      break;
    case 'skills':
      if (lenis) {
        lenis.scrollTo('#skills', { offset: +20, duration: 1.0 });
      } else {
        const skillsElement = document.getElementById('skills');
        if (skillsElement) {
          skillsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      break;
      case 'projects':
        if (lenis) {
          lenis.scrollTo('#projects', { offset: +60, duration: 2.0 });
        } else {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      break;
    case 'contact':
      if (lenis) {
        lenis.scrollTo('#contact', { offset: 0, duration: 4.0 });
      } else {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          setTimeout(() => {
            contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
      break;
  }
};

function NavItem({ href, label, index, onMobileMenuClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = (e) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    
    // Close mobile menu if it's open
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
    
    // If we're on a project page, set checkpoint and navigate to home
    if (location.pathname.startsWith('/project/')) {
      localStorage.setItem('scrollToSection', elementId);
      navigate('/');
    } else {
      // If we're on home page, scroll to checkpoint directly
      scrollToCheckpoint(elementId);
    }
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
    window.open('mailto:alberthansendev@outlook.com', '_self');
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
  const portfolioRef = useRef(null);
  const isInView = useInView(portfolioRef, { once: true, margin: "-50px" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="px-4 md:px-14 py-7 flex items-center justify-between font-medium relative">
        {/* Left section - Portfolio */}
        <div className="flex-1 flex justify-start">
          <a className="text-3xl md:text-5xl leading-tight" href="/">
            <motion.span
              ref={portfolioRef}
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
              Portfolio
            </motion.span>
          </a>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 justify-end mr-68">
          <ul className="flex space-x-6 justify-end">
            <NavItem href="#about" label="ABOUT" index={1} />
            <NavItem href="#skills" label="SKILLS" index={2} />
            <NavItem href="#projects" label="PROJECTS" index={3} />
            <NavItem href="#contact" label="LINKS" index={4} />
          </ul>
        </div>
        
        {/* Desktop Contact Button */}
        <div className="hidden lg:flex justify-end">
          <ContactButton href="#contact" label="CONTACT ME" index={5} />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl font-medium"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-[#ececec] px-4 py-6 border-t border-gray-300"
        >
          <ul className="flex flex-col space-y-4">
            <NavItem href="#about" label="ABOUT" index={1} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#skills" label="SKILLS" index={2} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#projects" label="PROJECTS" index={3} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#contact" label="LINKS" index={4} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <li className="pt-4">
              <ContactButton href="#contact" label="CONTACT ME" index={5} />
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;