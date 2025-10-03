import { useParams, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import Navbar from "../nav/Navbar";
import { projectData } from "../../data/projectData";
import ProjectImageGallery from "../small/ProjectImageGallery";
import { slidingTextVariants } from "../../motion/slidingTextAnimation";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectData[projectId];
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isLiveHovered, setIsLiveHovered] = useState(false);

  // Refs for text animations
  const buttonsRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const detailsRef = useRef(null);
  const techStackRef = useRef(null);
  const featuresRef = useRef(null);

  // InView states for text animations
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-50px" });
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const descriptionInView = useInView(descriptionRef, { once: true, margin: "-50px" });
  const detailsInView = useInView(detailsRef, { once: true, margin: "-50px" });
  const techStackInView = useInView(techStackRef, { once: true, margin: "-50px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-50px" });

  const handleBackClick = () => {
    // Navigate to home then scroll to projects checkpoint
    navigate('/');
    setTimeout(() => {
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

    return (
    <div className="pt-25 bg-[#ececec] overflow-hidden flex flex-col relative">
      

      {/* Image Gallery at the top */}
      <div className="w-full flex justify-center items-center flex-col">
         <motion.div 
          ref={buttonsRef}
          className="w-1/2 py-6 flex justify-between items-center"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={buttonsInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }}
          transition={{
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.1
          }}
        >
           <motion.button 
             className="cursor-pointer px-4 py-2 bg-black text-white rounded relative overflow-hidden"
             onMouseEnter={() => setIsBackHovered(true)}
             onMouseLeave={() => setIsBackHovered(false)}
             onClick={handleBackClick}
           >
             <motion.span 
               variants={slidingTextVariants.firstText}
               className="block"
               initial="initial"
               animate={isBackHovered ? "hover" : "animate"}
             >
               ← Back
             </motion.span>
             <motion.span
               variants={slidingTextVariants.secondText}
               className="absolute top-0 left-0 block px-4 py-2"
               aria-hidden
               initial="initial"
               animate={isBackHovered ? "hover" : "animate"}
             >
               ← Back
             </motion.span>
           </motion.button>
           <div className="flex gap-4">
             {project?.githubLink && (
               <motion.button 
                 className="cursor-pointer px-4 py-2 bg-black text-white rounded flex items-center gap-2 relative overflow-hidden"
                 onMouseEnter={() => setIsGithubHovered(true)}
                 onMouseLeave={() => setIsGithubHovered(false)}
                 onClick={() => window.open(project.githubLink, '_blank')}
               >
                 <motion.span 
                   variants={slidingTextVariants.firstText}
                   className="block flex items-center gap-2"
                   initial="initial"
                   animate={isGithubHovered ? "hover" : "animate"}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                   </svg>
                   GitHub
                 </motion.span>
                 <motion.span
                   variants={slidingTextVariants.secondText}
                   className="absolute top-0 left-0 block px-4 py-2 flex items-center gap-2"
                   aria-hidden
                   initial="initial"
                   animate={isGithubHovered ? "hover" : "animate"}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                   </svg>
                   GitHub
                 </motion.span>
               </motion.button>
             )}
             {project?.liveLink && (
               <motion.button 
                 className="cursor-pointer px-4 py-2 bg-black text-white rounded flex items-center gap-2 relative overflow-hidden"
                 onMouseEnter={() => setIsLiveHovered(true)}
                 onMouseLeave={() => setIsLiveHovered(false)}
                 onClick={() => window.open(project.liveLink, '_blank')}
               >
                 <motion.span 
                   variants={slidingTextVariants.firstText}
                   className="block flex items-center gap-2"
                   initial="initial"
                   animate={isLiveHovered ? "hover" : "animate"}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                     <polyline points="15,3 21,3 21,9" />
                     <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
                   View Live
                 </motion.span>
                 <motion.span
                   variants={slidingTextVariants.secondText}
                   className="absolute top-0 left-0 block px-4 py-2 flex items-center gap-2"
                   aria-hidden
                   initial="initial"
                   animate={isLiveHovered ? "hover" : "animate"}
                 >
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                     <polyline points="15,3 21,3 21,9" />
                     <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
                   View Live
                 </motion.span>
               </motion.button>
             )}
            </div>
          </motion.div>
        <ProjectImageGallery images={project?.images} />
        <motion.div 
          ref={titleRef}
          className="w-1/2 flex justify-between mt-8 pb-2 border-b border-gray-400"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={titleInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }}
          transition={{
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.1
          }}
        >
          <h1 className="text-2xl font-medium text-gray-500">{project?.number} &nbsp; &nbsp; <span className="text-black font-medium">{project?.title}</span></h1>
          <p className="text-2xl font-medium">{project?.description}</p>
        </motion.div>
        <motion.div 
          ref={descriptionRef}
          className="w-1/2"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={descriptionInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }}
          transition={{
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.2
          }}
        >
          <p className="mt-5 text-xl font-base">{project?.details}</p>
        </motion.div>
         <motion.div 
          ref={techStackRef}
          className="w-1/2 flex justify-between mt-12 gap-16 pb-60"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={techStackInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }}
          transition={{
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.3
          }}
        >
           <div className="flex-1">
             <h3 className="text-sm uppercase tracking-wider opacity-50 mb-6 ">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
               {project?.techStack.map((tech, index) => (
                 <span key={index} className="px-3 py-1 bg-white text-sm font-medium border border-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
           <motion.div 
            ref={featuresRef}
            className="flex-1"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={featuresInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }}
            transition={{
              duration: 1.2,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.4
            }}
          >
             <h3 className="text-sm uppercase tracking-wider opacity-50 mb-6">KEY FEATURES</h3>
             <div className="flex flex-wrap gap-2">
               {project?.features.map((feature, index) => (
                 <span key={index} className="px-3 py-1 bg-white text-sm font-medium border border-gray-200">
                    {feature}
                 </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
          </div>

    </div>
  );
}

export default ProjectDetail;

