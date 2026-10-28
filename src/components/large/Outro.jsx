import { projectData } from "../../data/projectData";

const gallery = [
  { src: projectData.educado.cover, caption: "Presenting Educado, an Erasmus+ project with universities worldwide" },
  { src: projectData.bookly.cover, caption: "Bookly, your personal library" },
];

// Closing section at the very bottom: two photos for atmosphere
function Outro() {
  return (
    // Tucked under the Contact card (negative margin, lower z-index) so it reads as the layer beneath
    <div className="relative z-20 -mt-8 md:-mt-12 px-4 sm:px-8 md:px-10 pt-40 md:pt-64 pb-16 md:pb-24 bg-[#e2e2e1]">

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
        {gallery.map((photo) => (
          <figure key={photo.caption}>
            <div className="overflow-hidden rounded-xl">
              <img src={photo.src} alt={photo.caption} className="w-full aspect-[4/3] object-cover object-top" />
            </div>
            <figcaption className="mt-3 text-xs text-black/50">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Outro;
