import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import CommonEnum from "../constants/CommonEnum";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-28 md:mt-5 lg:5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="mt-28 md:mt-5 lg:5 z-10">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">{CommonEnum.NAME}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I specialize in Web Development, Cloud Platforms, <br className="sm:block hidden" />
            and building intelligent Generative AI systems.
          </p>
          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/13YIxfSsKHdwKahyC1jIBLMqjM45HB8Et/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#915EFF] hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 ease-in-out inline-flex items-center gap-2 shadow-lg shadow-[#915eff]/30 border border-[#915eff]/50 hover:scale-105 active:scale-95"
            >
              <FaFilePdf size={18} />
              <span>View Resume</span>
            </a>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
