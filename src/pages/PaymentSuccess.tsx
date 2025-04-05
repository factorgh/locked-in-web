import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleCheck, ShoppingBag } from 'lucide-react';

const PaymentSuccess = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
        variants={itemVariants}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CircleCheck size={40} className="text-green-600" />
        </div>
        
        <motion.h1 
          className="text-3xl font-bold mb-4"
          variants={itemVariants}
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Payment Successful!
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-8"
          variants={itemVariants}
        >
          Thank you for your purchase. Your order has been placed and will be processed shortly.
          You will receive an email confirmation with the details of your order.
        </motion.p>
        
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg mb-8"
          variants={itemVariants}
        >
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              You'll receive an order confirmation email
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              We'll prepare your items for shipping
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              You'll receive shipping confirmation with tracking info
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Your beautiful hair products will arrive at your doorstep!
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-pink-600 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
          >
            Back to Home
          </Link>
          
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
          >
            <ShoppingBag size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;
