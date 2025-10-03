import { motion, useInView, AnimatePresence } from "framer-motion";
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
        className="list-none text-base leading-tight px-4 xl:px-7 py-3 bg-black xl:rounded-full bg-black text-white cursor-pointer w-full xl:w-auto"
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
  const mobileMenuRef = useRef(null);
  const isInView = useInView(portfolioRef, { once: true, margin: "-50px" });
  const isMobileMenuInView = useInView(mobileMenuRef, { once: true, margin: "-50px" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`px-4 md:px-14 py-7 flex items-center justify-between font-medium fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#ececec]' : 'bg-transparent'}`}>
        {/* Left section - Portfolio */}
        <div className="flex-1 flex justify-start items-center">
          <a className="text-2xl md:text-4xl leading-tight font-bold" href="/">
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
        <div className="hidden xl:flex flex-1 justify-end mr-68">
          <ul className="flex space-x-6 justify-end">
            <NavItem href="#about" label="ABOUT" index={1} />
            <NavItem href="#skills" label="SKILLS" index={2} />
            <NavItem href="#projects" label="PROJECTS" index={3} />
            <NavItem href="#contact" label="LINKS" index={4} />
          </ul>
        </div>
        
        {/* Desktop Contact Button */}
        <div className="hidden xl:flex justify-end">
          <ContactButton href="#contact" label="CONTACT ME" index={5} />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center">
          <motion.button
            ref={mobileMenuRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer text-sm font-medium tracking-wider bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors duration-200"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isMobileMenuInView
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
              delay: 0.2,
            }}
          >
            {isMobileMenuOpen ? "CLOSE" : "MENU"}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden bg-[#ececec] px-4 pt-6 border-t border-gray-300 fixed top-[84px] left-0 right-0 z-[9999]"
          >
          <ul className="flex flex-col space-y-8">
            <NavItem href="#about" label="ABOUT" index={1} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#skills" label="SKILLS" index={2} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#projects" label="PROJECTS" index={3} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <NavItem href="#contact" label="LINKS" index={4} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <li>
              <div className="w-screen -mx-4">
                <ContactButton href="#contact" label="CONTACT ME" index={5} />
              </div>
            </li>
          </ul>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;