import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type StripeCheckoutFormProps = {
  amount: number;
  onSuccess: () => void;
  customerName: string;
  customerEmail: string;
};

const StripeCheckoutForm = ({ amount, onSuccess }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Normally you would create a payment intent on the server first
    // For this demo, we're simulating the payment process

    // Get card element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false);
      setErrorMessage("Card information is incomplete");
      return;
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful payment (in a real app, you would create a payment intent on the server)
    if (Math.random() > 0.2) {
      // 80% success rate for demo
      toast.success("Payment processed successfully!");
      setIsProcessing(false);
      onSuccess();
    } else {
      // Simulate error
      setErrorMessage(
        "Your card was declined. Please try another payment method."
      );
      setIsProcessing(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="card-element"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Credit or debit card
        </label>
        <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-pink-600 focus-within:border-transparent">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {errorMessage && (
          <motion.div
            className="text-red-600 text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="save-card"
              type="checkbox"
              className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="save-card" className="text-gray-700">
              Save card for future purchases
            </label>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </motion.button>
    </form>
  );
};

export default StripeCheckoutForm;
