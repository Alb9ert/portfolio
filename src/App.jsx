import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Landing from "./components/Landing"
import Skills from "./components/Skills"


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
    </>
  )
}

export default App
