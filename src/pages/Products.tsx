import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { useInView } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

const Products = () => {
  const { products } = useAdmin();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    let result = products;

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(result);
  }, [products, activeCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-[#202020]">
      <motion.div
        className="text-center mb-10 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-4xl font-bold mb-3 text-white"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Discover Our Collection
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Premium products for all hair types and needs, formulated with the
          finest ingredients to transform your hair
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-col justify-between items-center md:items-center gap-4 mb-4">
          <motion.div
            className="relative w-full md:w-2/3 mb-5 "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-white py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center text-gray-700 gap-2"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </motion.button>
        </div>

        {/* Categories - Desktop */}
        <motion.div
          className="hidden md:flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-[#FFD700] text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Categories - Mobile */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeCategory === category
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl text-gray-600">
            No products found matching your criteria
          </h3>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("all");
            }}
            className="mt-4 text-pink-600 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Products;
