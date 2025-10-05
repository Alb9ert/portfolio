import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function ProjectImageGallery({ images }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  if (!images || images.length === 0) {
    return null;
  }
  
  const galleryImages = images.map(image => ({
    original: image,
    thumbnail: image,
  }));

  return (
      <motion.div
        ref={ref}
        className="w-full md:w-3/4 lg:w-1/2 border-2 border-black custom-gallery relative"
        style={{ height: 'auto' }}
        initial={{ 
          opacity: 0,
          y: 20
        }}
        animate={isInView ? {
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
      <style jsx global>{`
        .custom-gallery .image-gallery-left-nav:hover,
        .custom-gallery .image-gallery-right-nav:hover {
          color: black !important;
          background: transparent !important;
        }
        
        .custom-gallery .image-gallery-image {
          height: 250px !important;
          width: 100% !important;
          object-fit: cover !important;
          object-position: center top !important;
        }
        
        .custom-gallery .image-gallery-slide {
          height: 250px !important;
        }
        
        .custom-gallery .image-gallery-content {
          height: 250px !important;
        }

        @media (min-width: 640px) {
          .custom-gallery .image-gallery-image {
            height: 300px !important;
          }
          
          .custom-gallery .image-gallery-slide {
            height: 300px !important;
          }
          
          .custom-gallery .image-gallery-content {
            height: 300px !important;
          }
        }

        @media (min-width: 768px) {
          .custom-gallery .image-gallery-image {
            height: 350px !important;
          }
          
          .custom-gallery .image-gallery-slide {
            height: 350px !important;
          }
          
          .custom-gallery .image-gallery-content {
            height: 350px !important;
          }
        }

        @media (min-width: 1024px) {
          .custom-gallery .image-gallery-image {
            height: 400px !important;
          }
          
          .custom-gallery .image-gallery-slide {
            height: 400px !important;
          }
          
          .custom-gallery .image-gallery-content {
            height: 400px !important;
          }
        }

      `}</style>
      <ImageGallery 
        items={galleryImages}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={false}
        slideDuration={300}
        slideInterval={3000}
      />
    </motion.div>
  );
}

export default ProjectImageGallery;
