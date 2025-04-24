import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import StripeCheckoutForm from "../components/StripeCheckoutForm";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
    "stripe"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const requiredFields = [
      "name",
      "email",
      "address",
      "city",
      "zip",
      "country",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Move to payment step
    setCurrentStep(2);
  };

  const handlePaymentSuccess = () => {
    const order = {
      items: items,
      customer: {
        name: formData.name,
        email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.zip}, ${formData.country}`,
      },
      total: subtotal,
    };

    addOrder(order);
    clearCart();

    // Redirect to success page
    navigate("/payment-success");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center text-pink-600 hover:underline"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1
        className="text-3xl font-bold mb-8 text-white"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Checkout
      </h1>

      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-center">
          <ol className="flex items-center w-full max-w-3xl">
            <li
              className={`flex items-center ${
                currentStep >= 1 ? "text-pink-600" : "text-gray-500"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-[#FFD700] text-gray-900"
                    : "bg-gray-200"
                }`}
              >
                1
              </span>
              <span className="ml-2 text-sm font-medium text-[#FFD700]">
                Information
              </span>
              <div
                className={`w-16 sm:w-24 h-1 ml-2 ${
                  currentStep >= 2 ? "bg-[#FFD700" : "bg-gray-200"
                }`}
              ></div>
            </li>
            <li
              className={`flex items-center ${
                currentStep >= 2 ? "text-pink-600" : "text-gray-500"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2 ? "bg-pink-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </span>
              <span className="ml-2 text-sm font-medium text-gray-100">
                Payment
              </span>
            </li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 ? (
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Your Information</h2>

              <form onSubmit={handleContinueToPayment}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Shipping Address</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-pink-600 text-white rounded-full font-medium flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  Continue to Payment
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Payment</h2>

              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod("stripe")}
                    className={`py-2 px-4 rounded-md flex items-center border ${
                      paymentMethod === "stripe"
                        ? "border-pink-600 bg-pink-50 text-pink-600"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5V19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`py-2 px-4 rounded-md flex items-center border ${
                      paymentMethod === "paypal"
                        ? "border-pink-600 bg-pink-50 text-pink-600"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12V7H5C4.46957 7 3.96086 6.78929 3.58579 6.41421C3.21071 6.03914 3 5.53043 3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 16V14H5C4.46957 14 3.96086 13.7893 3.58579 13.4142C3.21071 13.0391 3 12.5304 3 12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 19C3 18.4696 3.21071 17.9609 3.58579 17.5858C3.96086 17.2107 4.46957 17 5 17H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    PayPal
                  </button>
                </div>

                {paymentMethod === "stripe" ? (
                  <StripeCheckoutForm
                    amount={subtotal}
                    onSuccess={handlePaymentSuccess}
                    customerName={formData.name}
                    customerEmail={formData.email}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">
                      PayPal integration coming soon.
                    </p>
                    <button
                      onClick={() => setPaymentMethod("stripe")}
                      className="text-pink-600 hover:underline"
                    >
                      Use credit card instead
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  &larr; Return to information
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="max-h-80 overflow-y-auto mb-4 pr-2">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  className="flex items-center py-3 border-b last:border-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-16 w-16 flex-shrink-0 mr-4 overflow-hidden rounded-md">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium text-sm">
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-b py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <motion.span
                key={subtotal}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                ${subtotal.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
