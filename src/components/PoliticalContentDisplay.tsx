import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { PoliticalContent } from "../types";

const PoliticalContentDisplay = () => {
  const { politicalContent } = useAdmin();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Filter only active political content
  const activeContent = politicalContent.filter((content) => content.active);

  if (activeContent.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Our Political Stance
          </h2>
          <motion.div
            className="w-24 h-1 bg-pink-600 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
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
  content: PoliticalContent;
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
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{content.title}</h3>
        <div className="prose max-w-none">
          {content.content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {content.mediaType !== "none" && content.mediaUrl && (
        <div className="mt-4">
          {content.mediaType === "image" ? (
            <img
              src={content.mediaUrl}
              alt={content.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          ) : (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={content.mediaUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[400px]"
                title={content.title}
              />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PoliticalContentDisplay;
