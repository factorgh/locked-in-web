import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center text-pink-600 hover:underline"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to products
        </button>
      </div>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-[#171717]">
      <button
        onClick={() => navigate("/products")}
        className="inline-flex items-center text-white mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          className="overflow-hidden rounded-lg shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-3xl font-bold mb-2 text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {product.name}
          </h1>

          <div className="text-sm text-gray-300 mb-4">
            Category:{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </div>

          <div className="text-2xl font-semibold text-[#FFD700] mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-300 mb-8">{product.description}</p>

          <div className="mb-8">
            <div className="text-gray-300 mb-2">Quantity:</div>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full border text-white border-yellow-500 flex items-center justify-center transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>

              <span className="w-12 text-center font-medium text-gray-300">
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full border border-yellow-500 text-gray-300 flex items-center justify-center transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>

              <span className="ml-4 text-sm text-gray-300">
                {product.stock} units available
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#FFD700] text-black rounded-full font-medium flex items-center justify-center transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
