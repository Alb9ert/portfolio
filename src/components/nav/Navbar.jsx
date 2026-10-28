import { motion, useInView, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { waterfallAnimation } from "../../motion/loadItemAnimation";
import { slidingTextVariants } from "../../motion/slidingTextAnimation";
import { scrollToCheckpoint } from "../../utils/scrollToCheckpoint";

// Page sections, in order, for the "where am I" label in the corner
const SECTIONS = [
  { id: "home", label: "Portfolio", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "contact", label: "Contact", num: "04" },
];

// The last section whose top has passed 40% down the viewport
const getCurrentSection = () => {
  let current = SECTIONS[0];
  for (const section of SECTIONS) {
    const el = document.getElementById(section.id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = section;
  }
  return current;
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
  const mobileMenuRef = useRef(null);
  const isMobileMenuInView = useInView(mobileMenuRef, { once: true, margin: "-50px" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logo only shows at the top of the page; the corner items stay
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [section, setSection] = useState(SECTIONS[0]);
  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 80);
    setSection(getCurrentSection());
  });
  const location = useLocation();
  const navigate = useNavigate();

  // "Open for collaborations" jumps to the Contact section, via the home page if needed
  const goToContact = (e) => {
    e.preventDefault();
    if (location.pathname.startsWith("/project/")) {
      localStorage.setItem("scrollToSection", "contact");
      navigate("/");
    } else {
      scrollToCheckpoint("contact");
    }
  };
  // Project pages show my name in the logo spot; the home page shows my title
  const logoText = location.pathname.startsWith("/project/") ? "ALBERT HANSEN" : "SOFTWARE DEVELOPER";
  const current = location.pathname.startsWith("/project/") ? { label: "Project" } : section;
  const hideLogo = isScrolled && !isMobileMenuOpen;
  const logoVisibility = {
    animate: { opacity: hideLogo ? 0 : 1, y: hideLogo ? -12 : 0 },
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
    style: { pointerEvents: hideLogo ? "none" : "auto" },
  };

  return (
    <>
      <nav className={`px-4 md:px-10 py-7 flex items-center justify-between font-medium fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#ececec]' : 'bg-transparent'}`}>
        {/* Left - availability (desktop) / logo (mobile) */}
        <motion.div
          className="flex-1 flex justify-start items-center"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={waterfallAnimation}
        >
          <motion.a className="xl:hidden text-lg sm:text-2xl md:text-3xl leading-tight font-bold" href="/" {...logoVisibility}>
            {logoText}
          </motion.a>
          <a
            href="#contact"
            onClick={goToContact}
            className="hidden xl:flex items-center gap-3 text-xs leading-tight font-normal"
          >
            {/* Gliding paper plane - "send me a message" */}
            <motion.svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [0, 2, 0], y: [0, -2, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <path d="M22 2 L15 22 L11 13 L2 9 Z" />
              <path d="M22 2 L11 13" />
            </motion.svg>
            <span>
              Open for any
              <br />
              collaborations and offers
            </span>
          </a>
        </motion.div>

        {/* Center logo (desktop) */}
        <motion.div {...logoVisibility}>
          <motion.a
            className="hidden xl:block text-3xl leading-tight font-bold"
            href="/"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={waterfallAnimation}
          >
            {logoText}
          </motion.a>
        </motion.div>

        {/* Right - current section (desktop) */}
        <motion.div
          className="hidden xl:flex flex-1 justify-end text-xs leading-tight font-normal text-right"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={waterfallAnimation}
        >
          <span className="relative block overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.label}
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              >
                {current.num && <span className="block text-[10px] opacity-50">{current.num}</span>}
                {current.label}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

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
            <NavItem href="#contact" label="CONTACT" index={4} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            <li className="-mt-3">
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