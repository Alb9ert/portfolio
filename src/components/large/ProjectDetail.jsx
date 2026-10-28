import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { projectData, projectsByDate } from "../../data/projectData";
import { techIcons } from "../../data/techIcons";
import { getLenis } from "../../App";
import ScrollLinkLabel from "../small/ScrollLinkLabel";

const EASE = [0.19, 1, 0.22, 1];
// Same newest-first order as the project list, so "Next project" walks it in order
const projectIds = projectsByDate.map((p) => p.id);

// Blur-to-sharp fade for blocks of content
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE, delay },
});

const LABEL = "text-[10px] uppercase tracking-wider text-black/50";

// Smooth-scroll down to the gallery, leaving room for the fixed navbar
const scrollToGallery = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo("#gallery", { offset: -100, duration: 1.0 });
  } else {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Same hover animation as the section links on the landing page
function GalleryLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={scrollToGallery}
      className="inline-block text-left cursor-pointer px-3 py-2 -mx-3 -my-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScrollLinkLabel label="Jump to photos" isHovered={isHovered} />
    </button>
  );
}

// Bottom-row link with the same click area and hover animation as the landing nav links
function BottomLink({ to, onClick, label, back = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-6 py-4 -mx-6 -my-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScrollLinkLabel label={label} isHovered={isHovered} direction={back ? "left" : "right"} />
    </Link>
  );
}

const TechLogo = ({ icon }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
    <path d={icon.path} fill={`#${icon.hex}`} />
  </svg>
);

function ExternalLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 border-b border-black/30 hover:border-black pb-0.5 transition-colors"
    >
      {label}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
    </a>
  );
}

// Full-screen image viewer: arrows / keys to browse, Esc or backdrop click to close
function Lightbox({ images, index, onClose, onChange, title }) {
  const go = useCallback((step) => onChange((index + step + images.length) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  const navButton = "absolute top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl px-4 py-6 cursor-pointer";

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button className={`${navButton} left-2`} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image">
            ←
          </button>
          <button className={`${navButton} right-2`} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image">
            →
          </button>
        </>
      )}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6 text-sm text-white/70 tabular-nums">
        <span>
          {index + 1} / {images.length}
        </span>
        <button onClick={onClose} className="hover:text-white cursor-pointer">
          Close (Esc)
        </button>
      </div>
    </motion.div>
  );
}

// Image shown at its natural aspect ratio, never cropped; opens the lightbox on click.
// No scroll-in animation: in-view detection proved unreliable here and could leave images hidden
function Shot({ src, alt, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group block w-full overflow-hidden rounded-xl border border-black/10 bg-white cursor-zoom-in"
    >
      <img src={src} alt={alt} className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
    </button>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectData[projectId];
  const [openIndex, setOpenIndex] = useState(null);

  // Close the lightbox when "Next project" switches to another project
  useEffect(() => setOpenIndex(null), [projectId]);

  // Back to the project list on the home page (CheckpointScroll in App picks this up)
  const backToProjects = (e) => {
    e.preventDefault();
    localStorage.setItem("scrollToSection", "projects");
    navigate("/");
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#ececec] px-4 md:px-10 pt-40">
        <p className="text-2xl mb-6">That project doesn't exist.</p>
        <a href="/" onClick={backToProjects} className="underline underline-offset-4">
          ← All projects
        </a>
      </div>
    );
  }

  const images = project.images ?? [];
  const nextId = projectIds[(projectIds.indexOf(projectId) + 1) % projectIds.length];
  const next = projectData[nextId];

  return (
    // Keyed by project so the entrance animations replay when moving to the next one
    <div key={projectId} className="min-h-screen bg-[#ececec] px-4 md:px-10 pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <motion.a
          href="/"
          onClick={backToProjects}
          className="group inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-6 md:mb-8"
          {...fadeIn()}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          All projects
        </motion.a>

        {/* Header: name + date with links on one row, description + jump link on the next */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h1 className="text-5xl md:text-6xl font-medium leading-[0.95] overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
                >
                  {project.title}
                </motion.span>
              </h1>
              <motion.span className="text-sm text-black/50" {...fadeIn(0.2)}>
                {project.month ? `${project.month} ${project.year}` : project.year}
                {project.type && ` · ${project.type}`}
              </motion.span>
            </div>
            {(project.liveLink || project.githubLink) && (
              <motion.div className="flex flex-col sm:items-end gap-1.5 pb-2" {...fadeIn(0.3)}>
                <span className="flex gap-6 text-base">
                  {project.liveLink && <ExternalLink href={project.liveLink} label="Live site" />}
                  {project.githubLink && <ExternalLink href={project.githubLink} label="GitHub" />}
                </span>
                {/* Optional status note, e.g. when the site is live but the service is paused */}
                {project.liveNote && <span className="text-xs text-black/50">{project.liveNote}</span>}
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 mt-4">
            <motion.p className="text-base md:text-lg text-black/60 max-w-2xl" {...fadeIn(0.25)}>
              {project.description}
            </motion.p>
            {images.length > 0 && (
              <motion.div className="text-sm md:text-base" {...fadeIn(0.35)}>
                <GalleryLink />
              </motion.div>
            )}
          </div>
        </div>

        {/* About + details: animated on page load rather than on scroll-into-view, since they
            sit near the top and some browsers miss the in-view signal after the route's scroll reset */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-24 border-t border-black/15 pt-10 md:pt-14 mb-16 md:mb-24">
          <motion.div {...fadeIn(0.35)}>
            <p className={`${LABEL} mb-4`}>About the project</p>
            <p className="text-base md:text-lg leading-relaxed">{project.details}</p>
            {/* Optional related article */}
            {project.readMore && (
              <p className="mt-6 text-sm">
                <span className="text-black/50">Related read: </span>
                <ExternalLink href={project.readMore.href} label={project.readMore.label} />
              </p>
            )}
          </motion.div>

          <motion.div className="space-y-10" {...fadeIn(0.45)}>
            <div>
              <p className={`${LABEL} mb-4`}>Built with</p>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => {
                  const icon = techIcons[tech];
                  return (
                    <li key={tech} className="inline-flex items-center gap-2 text-sm rounded-full border border-black/15 bg-white/60 pl-2.5 pr-3 py-1">
                      {icon ? (
                        <TechLogo icon={icon} />
                      ) : (
                        <span className="w-1.5 h-1.5 mx-[5px] rounded-full bg-black/30" aria-hidden />
                      )}
                      {tech}
                    </li>
                  );
                })}
              </ul>
            </div>
            {project.features?.length > 0 && (
              <div>
                <p className={`${LABEL} mb-4`}>Interesting features</p>
                <ol className="grid sm:grid-cols-2 gap-x-8">
                  {project.features.map((feature, i) => (
                    <li key={feature} className="flex gap-3 border-t border-black/10 py-2.5 text-sm">
                      <span className="text-[10px] text-black/35 tabular-nums pt-1">{String(i + 1).padStart(2, "0")}</span>
                      {feature}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>
        </div>

        {/* Screenshots: masonry columns keep every image at its own aspect ratio */}
        {images.length > 0 && (
          <div id="gallery" className="mb-24 md:mb-32">
            <p className={`${LABEL} mb-6`}>Gallery</p>
            {/* Two real columns (images alternate left/right) instead of CSS columns, so every
                image keeps its own aspect ratio and nothing depends on multi-column quirks */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
              {[0, 1].map((column) => (
                <div key={column} className={`flex flex-col gap-6 md:gap-8 ${column === 1 ? "hidden md:flex" : ""}`}>
                  {images.map((src, i) =>
                    // On phones the first column shows every image; on desktop images alternate
                    (column === 0 ? true : i % 2 === 1) && (
                      <div key={src} className={column === 0 && i % 2 === 1 ? "md:hidden" : ""}>
                        <Shot src={src} alt={`${project.title} screenshot ${i + 1}`} onOpen={() => setOpenIndex(i)} />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: back to the list on the left, next project on the right */}
        <div className="flex items-center justify-between border-t border-black/15 pt-8 pb-4">
          <BottomLink to="/" onClick={backToProjects} label="Back to projects" back />
          <BottomLink to={`/project/${nextId}`} label={`Next project: ${next.title}`} />
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            onChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
            title={project.title}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectDetail;
