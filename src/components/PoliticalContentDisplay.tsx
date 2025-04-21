import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useAdmin } from "../context/AdminContext";

const PoliticalContentDisplay = () => {
  const { politicalContent } = useAdmin();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const activeContent = politicalContent.filter((content) => content.active);

  if (activeContent.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-r from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Political Voice
          </h2>
          <motion.div
            className="w-32 h-1 bg-yellow-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: "8rem" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {activeContent.map((content, index) => (
            <PoliticalContentCard
              key={content.id}
              content={content}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type PoliticalContentCardProps = {
  content: {
    title: string;
    content: string;
    mediaUrl?: string;
  };
  index: number;
  isInView: boolean;
};

const PoliticalContentCard = ({
  content,
  index,
  isInView,
}: PoliticalContentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        type: "spring",
        stiffness: 120,
      }}
      className="relative bg-gradient-to-tr from-[#1a1a1a] to-[#2b2b2b] rounded-3xl p-10 sm:p-14 shadow-2xl text-white overflow-hidden"
    >
      {/* LEFT */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10 relative z-10">
        <div className="flex-1 max-w-2xl">
          <h3 className="text-yellow-400 text-xs uppercase font-semibold tracking-widest mb-4">
            {content.title}
          </h3>
          <div className="text-gray-300 text-sm space-y-4 leading-relaxed">
            {content.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* RIGHT HEX IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <div className="grid grid-cols-3">
            {/* Top Center */}
            <div className="col-start-2 row-start-1 flex justify-center items-center">
              <HexagonImage src={content.mediaUrl} />
            </div>

            {/* Middle Left */}
            <div className="col-start-1 row-start-2 flex justify-center items-center">
              <HexagonImage src={content.mediaUrl} />
            </div>

            {/* Middle Right */}
            <div className="col-start-3 row-start-2 flex justify-center items-center">
              <HexagonImage src={content.mediaUrl} />
            </div>

            {/* Bottom Center */}
            <div className="col-start-2 row-start-3 flex justify-center items-center">
              <HexagonImage src={content.mediaUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG Hex Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-10 left-[10%] w-[400px] opacity-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="hex-pattern"
            width="20"
            height="17.32"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="10,0 20,5 20,15 10,20 0,15 0,5"
              stroke="#ffffff22"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>
    </motion.div>
  );
};

export default PoliticalContentDisplay;

const HexagonImage = ({ src }: { src?: string }) => (
  <div
    className="w-[150px] h-[120px] bg-gradient-to-br from-[#292929] to-[#3a3a3a] rounded-md shadow-md overflow-hidden"
    style={{
      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    }}
  >
    {src && (
      <img
        src={src}
        alt="Political Visual"
        className="w-full h-full object-cover"
      />
    )}
  </div>
);
