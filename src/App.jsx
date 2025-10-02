import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Landing from "./components/large/Landing"
import Skills from "./components/large/Skills"
import Projects from "./components/large/Projects"
import Links from "./components/large/Links"


function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
    })

    // Animation frame for smooth scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

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
  )
}

export default App
