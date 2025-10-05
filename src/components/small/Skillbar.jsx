import { div } from "framer-motion/client";

function Skillbar({ logo, name, proficiency, logoSize = "w-full" }) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 sm:w-20 md:w-24 lg:w-1/4 flex items-center justify-center flex-shrink-0">
        <img src={logo} alt="logo" className={logoSize} />
      </div>
      <div className="flex flex-col ml-3 sm:ml-4 w-full justify-end pb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
            {name}
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium ml-2">
            {proficiency}%
          </p>
        </div>
        {/* Progress bar background */}
        <div className="w-full h-1 bg-black/20 relative overflow-hidden rounded-full shadow-sm">
          {/* Progress bar fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-500 rounded-full shadow-sm"
            style={{ width: `${proficiency}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Skillbar;
