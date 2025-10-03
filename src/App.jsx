import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Lenis from "@studio-freight/lenis"
import Navbar from "./components/nav/Navbar"
import Landing from "./components/large/Landing"
import Skills from "./components/large/Skills"
import Projects from "./components/large/Projects"
import Links from "./components/large/Links"
import ProjectDetail from "./components/large/ProjectDetail"

// Global Lenis instance
let lenisInstance = null;

export const getLenis = () => lenisInstance;

// Reset scroll position on navigation
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

// Simple checkpoint system - scroll to specific sections when needed
function CheckpointScroll() {
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Check if we need to scroll to a specific section
      const scrollToSection = localStorage.getItem('scrollToSection');
      if (scrollToSection) {
        localStorage.removeItem('scrollToSection');
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <div id="about">
        <Landing />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Links />
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 2,
    })

    // Store instance globally
    lenisInstance = lenis;

    // Animation frame for smooth scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisInstance = null;
    }
  }, [])

  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <CheckpointScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}

export default App
