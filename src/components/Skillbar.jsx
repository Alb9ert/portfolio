function Skillbar({ backgroundImg, logo, name, proficiency = 50 }) {
    // Calculate height based on proficiency (0-100)
    const barHeight = `${proficiency}%`;
    
    return (
        <div className="w-full flex flex-col items-center justify-end" style={{ height: '500px' }}>
          <div 
            className="rounded-lg flex justify-center items-center w-full relative overflow-hidden transition-all duration-700 ease-out shadow-lg hover:shadow-2xl"
            style={{ height: barHeight }}
          >
            {/* Blurred background layer */}
            <div 
              className="absolute inset-0 bg-center bg-no-repeat"
              style={{ 
                  backgroundImage: `url(${backgroundImg})`,
                  backgroundSize: 'cover',
                  imageRendering: 'crisp-edges',
                  filter: 'blur(3px) brightness(1.15) saturate(1.3) contrast(1.1)'
              }}
            />
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Sharp logo on top */}
            <img src={logo} alt={name} className="w-2/5 object-contain z-10 drop-shadow-lg" />
        </div>
        <p className="mt-4 text-xl font-medium tracking-wide opacity-80">{name}</p>
        </div>
    );
}

export default Skillbar;