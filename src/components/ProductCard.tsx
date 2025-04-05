import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

type ProductCardProps = {
  product: Product;
  index?: number;
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          className="h-64 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="text-pink-600 font-semibold"
          >
            ${product.price.toFixed(2)}
          </motion.div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/product/${product.id}`}
            className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
          >
            View Details
          </Link>

          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#db2777", // pink-700
              transition: { duration: 0.2, type: "spring", stiffness: 400 },
            }}
            className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
