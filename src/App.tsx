import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminPoliticalContent from "./pages/admin/PoliticalContent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { AdminProvider } from "./context/AdminContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import AboutUsPage from "./pages/About";

// Replace with your own publishable key from the Stripe Dashboard
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <AdminProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#ec4899",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
            <div
              className="min-h-screen flex flex-col bg-[#202020]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Home />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <PageTransition>
                        <Products />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <PageTransition>
                        <AboutUsPage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <PageTransition>
                        <ProductDetail />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PageTransition>
                        <Cart />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <PageTransition>
                        <Checkout />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/payment-success"
                    element={
                      <PageTransition>
                        <PaymentSuccess />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <PageTransition>
                        <AdminDashboard />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <PageTransition>
                        <AdminProducts />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <PageTransition>
                        <AdminOrders />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/admin/political-content"
                    element={
                      <PageTransition>
                        <AdminPoliticalContent />
                      </PageTransition>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Elements>
        </CartProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
