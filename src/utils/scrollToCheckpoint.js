import { getLenis } from "../App";

// Simple checkpoint scroll function using Lenis
export const scrollToCheckpoint = (checkpoint) => {
  const lenis = getLenis();
  
  switch(checkpoint) {
    case 'about':
      if (lenis) {
        lenis.scrollTo('#about', { offset: 0, duration: 1.0 });
      } else {
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
          lenis.scrollTo('#projects', { offset: +60, duration: 1.0 });
        } else {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      break;
    case 'contact':
      if (lenis) {
        lenis.scrollTo('#contact', { offset: 0, duration: 1.2 });
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
