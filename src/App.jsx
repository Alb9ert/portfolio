import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Landing from "./components/large/Landing"
import Skills from "./components/large/Skills"
import Projects from "./components/large/Projects"


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
      <Landing />
      <Skills />
      <Projects />
    </>
  )
}

export default App
