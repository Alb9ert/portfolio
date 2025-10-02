import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Lenis from "@studio-freight/lenis"
import Landing from "./components/large/Landing"
import Skills from "./components/large/Skills"
import Projects from "./components/large/Projects"
import Links from "./components/large/Links"
import ProjectDetail from "./components/large/ProjectDetail"

// Global Lenis instance
let lenisInstance = null;

export const getLenis = () => lenisInstance;

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
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}

export default App
