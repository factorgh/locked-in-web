import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        <h1 className="text-5xl font-bold text-center text-[#e5c07b]">
          The Dark Her
        </h1>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Her Story</h2>
          <p className="leading-relaxed text-lg text-gray-200">
            A beauty movement rooted in legacy, powered by nature, and elevated
            by science. We believe in honouring the wisdom of our ancestors —
            not just in spirit, but in practice. Our skin and hair remember
            where they come from, and our care rituals should too. We reject
            Western beauty standards never designed with us in mind. Instead, we
            restore ancestral harmony through holistic beauty rituals that
            empower, heal, and affirm Black identity.
          </p>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-10"
        >
          <img
            src="https://images.pexels.com/photos/6663469/pexels-photo-6663469.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Ancestral beauty"
            className="rounded-2xl shadow-xl"
          />
          <div className="space-y-4">
            <p className="text-gray-300">
              At The Dark Her, we believe that beauty is not something to be
              tamed, corrected, or diluted — it is to be honored. Our mission is
              to restore reverence for Black skin and hair by prioritizing
              biocompatibility with ingredients ancestrally aligned: shea,
              baobab, chebe, hibiscus.
            </p>
            <p className="text-gray-300">
              Our products are rituals in a jar — born from the soil of our
              mothers’ lands. Not just clean beauty, but cultural beauty.
              Science-backed heritage that speaks to our melanin-rich skin and
              textured hair.
            </p>
          </div>
        </motion.div>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#e5c07b]">Her Science</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold">
                1. Epigenetics & Evolutionary Adaptation
              </h3>
              <p>
                Melanin-rich skin evolved with ancestral environments — from the
                oils to the climate. Our bodies remember these ingredients like
                muscle memory. Studies show these natural compounds affect gene
                expression over generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                2. Biochemical Compatibility
              </h3>
              <p>
                Ingredients like shea butter and baobab align with our skin’s
                chemistry. Their fatty acids and pH naturally support our lipid
                barriers and sebum balance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">3. Microbiome Harmony</h3>
              <p>
                Ancestral ingredients nourish the skin microbiome —
                prebiotic-rich, minimally processed, and balanced for
                melanin-rich bodies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                4. Cultural Wisdom Meets Clinical Evidence
              </h3>
              <p>
                From chebe to hibiscus, ancient rituals are now validated by
                science — proving our ancestors were the original
                dermatologists.
              </p>
            </div>
          </div>
        </section>

        <motion.div
          className="mt-12 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg italic text-gray-400">
            Biocompatibility isn’t a trend — it’s a return. A reconnection. A
            reclamation.
          </p>
          <p className="mt-4 text-2xl font-semibold text-[#e5c07b]">
            “Don’t take it from us. Take it from her.”
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white rounded-full w-20 h-20 overflow-hidden">
              <video
                src="/videos/testimonial1.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-full w-20 h-20 overflow-hidden">
              <video
                src="/videos/testimonial2.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white rounded-full w-20 h-20 overflow-hidden">
              <video
                src="/videos/testimonial3.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Beauty is resistance. Beauty is memory. Beauty is reclamation.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
