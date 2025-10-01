import { div } from "framer-motion/client";

function Skillbar({ logo, name, proficiency, logoSize = "w-full" }) {
  return (
    <div className="flex justify-center">
      <div className="w-1/4 flex items-center justify-center">
        <img src={logo} alt="logo" className={logoSize} />
      </div>
      <div className="flex flex-col ml-4 w-full justify-end pb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-2xl font-medium">
            {name}
          </p>
          <p className="text-2xl font-medium">
            {proficiency}%
          </p>
        </div>
        {/* Progress bar background */}
        <div className="w-full h-1 bg-black/20 relative overflow-hidden">
          {/* Progress bar fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-500"
            style={{ width: `${proficiency}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Skillbar;
