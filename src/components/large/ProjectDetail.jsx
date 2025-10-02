import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../nav/Navbar";

// Project data - you can expand this with your actual project details
const projectData = {
  bookly: {
    title: "Bookly",
    number: "(01)",
    year: "2025",
    status: "Completed",
    category: "Full-Stack Application",
    description: "A comprehensive book recommendation system that helps users discover their next favorite read through intelligent algorithms and personalized suggestions.",
    fullDescription: `Bookly is a modern web application designed to revolutionize how readers discover books. Built with a focus on user experience and intelligent recommendations, the platform combines cutting-edge technology with intuitive design.

The application features a sophisticated recommendation engine that analyzes user preferences, reading history, and behavioral patterns to suggest books that match individual tastes. The clean, minimalist interface ensures that users can easily navigate through thousands of titles while maintaining focus on what matters most - finding great books to read.`,
    technologies: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "OpenAI API"],
    features: [
      "AI-powered book recommendations",
      "User profile and reading history",
      "Social features for book discussions",
      "Advanced search and filtering",
      "Reading progress tracking",
      "Personalized book lists"
    ],
    images: {
      hero: "/src/assets/projects/booklyFront.png",
      gallery: [
        "/src/assets/projects/booklyFront.jpg",
        "/src/assets/projects/booklyFront.png",
        "/src/assets/projects/booklyFront.jpg",
        "/src/assets/projects/booklyFront.png"
      ]
    },
    link: "https://bookly.com",
    github: "https://github.com/yourusername/bookly"
  },
  cookai: {
    title: "CookAI",
    number: "(02)",
    year: "2024",
    status: "Completed",
    category: "AI Application",
    description: "An AI-powered recipe recommendation and meal planning platform that makes cooking easier and more enjoyable.",
    fullDescription: `CookAI transforms the cooking experience by leveraging artificial intelligence to provide personalized recipe recommendations based on your ingredients, dietary preferences, and cooking skill level.

The platform intelligently suggests recipes that match what you have in your kitchen, reducing food waste and making meal planning effortless. With step-by-step instructions and smart grocery list generation, CookAI makes home cooking accessible and enjoyable for everyone.`,
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "TailwindCSS", "OpenAI API"],
    features: [
      "AI recipe generation",
      "Ingredient-based search",
      "Dietary restriction filtering",
      "Smart grocery lists",
      "Cooking timer integration",
      "Recipe sharing community"
    ],
    images: {
      hero: "/src/assets/projects/cookaiFront.png",
      gallery: [
        "/src/assets/projects/cookaiFront2.jpg",
        "/src/assets/projects/cookaiFront.png",
        "/src/assets/projects/cookaiFront2.jpg",
        "/src/assets/projects/cookaiFront.png"
      ]
    },
    link: "https://cookai.com",
    github: "https://github.com/yourusername/cookai"
  },
  cybermatch: {
    title: "CyberMatch",
    number: "(03)",
    year: "2024",
    status: "Completed",
    category: "Corporate Website",
    description: "A professional website for a cybersecurity company, showcasing their services and expertise.",
    fullDescription: `CyberMatch's website represents a modern approach to corporate web presence in the cybersecurity industry. The site combines professional design with clear communication of complex security concepts.

Built with a focus on trust and credibility, the website features detailed service breakdowns, case studies, and client testimonials. The design emphasizes clarity and professionalism while maintaining visual interest through subtle animations and thoughtful typography.`,
    technologies: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    features: [
      "Service showcase",
      "Case study presentations",
      "Client testimonials",
      "Contact forms",
      "Blog system",
      "Responsive design"
    ],
    images: {
      hero: "/src/assets/projects/cybermatchFront.png",
      gallery: [
        "/src/assets/projects/cybermatchFront2.png",
        "/src/assets/projects/cybermatchFront.png",
        "/src/assets/projects/cybermatchFront2.png",
        "/src/assets/projects/cybermatchFront.png"
      ]
    },
    link: "https://cybermatch.com",
    github: null
  },
  pseudomat: {
    title: "PseudoMat",
    number: "(04)",
    year: "2024",
    status: "Completed",
    category: "Educational Platform",
    description: "An educational platform for learning algorithms and data structures through visual pseudocode.",
    fullDescription: `PseudoMat makes learning algorithms accessible and engaging through interactive visualizations and clear pseudocode explanations. The platform is designed for students and professionals looking to strengthen their understanding of fundamental computer science concepts.

Each algorithm is presented with step-by-step visualizations, complexity analysis, and practical examples. The clean interface ensures focus remains on understanding core concepts while the interactive elements make learning active rather than passive.`,
    technologies: ["React", "TypeScript", "D3.js", "TailwindCSS"],
    features: [
      "Interactive algorithm visualizations",
      "Step-by-step pseudocode",
      "Complexity analysis",
      "Practice problems",
      "Progress tracking",
      "Code playground"
    ],
    images: {
      hero: "/src/assets/projects/pseudomatFront.png",
      gallery: [
        "/src/assets/projects/pseudomatFront2.png",
        "/src/assets/projects/pseudomatFront.png",
        "/src/assets/projects/pseudomatFront2.png",
        "/src/assets/projects/pseudomatFront.png"
      ]
    },
    link: "https://pseudomat.com",
    github: "https://github.com/yourusername/pseudomat"
  }
};

function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectData[projectId];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.gallery.length - 1 : prev - 1
    );
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Project not found</h1>
          <Link to="/" className="text-xl underline">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ececec] h-screen overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 px-14 py-8 flex gap-16">
        
        {/* Left: Gallery */}
        <div className="w-1/2 flex flex-col">
          <div className="relative flex-1 bg-[#ececec]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images.gallery[currentImageIndex]}
                alt={`${project.title}`}
                className="w-full h-full object-contain object-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-sm font-medium">
              {currentImageIndex + 1} / {project.images.gallery.length}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {project.images.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-black w-8' 
                    : 'bg-black/20 hover:bg-black/40 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-1/2 flex flex-col">
          
          <div className="mb-6">
            <h1 className="text-6xl font-medium mb-4">
              <span className="opacity-40 mr-3">{project.number}</span>
              {project.title}
            </h1>
            <div className="flex gap-12 text-base">
              <div>
                <span className="opacity-50">Year: </span>
                <span className="font-medium">{project.year}</span>
              </div>
              <div>
                <span className="opacity-50">Status: </span>
                <span className="font-medium">{project.status}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            
            <div>
              <p className="text-lg leading-relaxed opacity-70">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider opacity-50 mb-4">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider opacity-50 mb-4">KEY FEATURES</h3>
              <div className="space-y-2">
                {project.features.map((feature) => (
                  <p
                    key={feature}
                    className="text-base opacity-70 pl-4 border-l-2 border-black/15"
                  >
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-black text-white text-center text-sm font-medium uppercase tracking-wider hover:bg-black/85 transition-colors"
              >
                VIEW LIVE
              </a>
            )}
            
            <Link 
              to="/#projects"
              className="text-base font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to projects</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;

