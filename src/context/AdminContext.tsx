import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, Order, PoliticalContent } from "../types";
import { mockProducts } from "../data/products";
import toast from "react-hot-toast";

type AdminContextType = {
  products: Product[];
  orders: Order[];
  politicalContent: PoliticalContent[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  addPoliticalContent: (
    content: Omit<PoliticalContent, "id" | "createdAt">
  ) => void;
  updatePoliticalContent: (content: PoliticalContent) => void;
  deletePoliticalContent: (contentId: string) => void;
  togglePoliticalContentActive: (contentId: string) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [politicalContent, setPoliticalContent] = useState<PoliticalContent[]>(
    []
  );

  useEffect(() => {
    // Load products from localStorage or use mock data
    // try {
    //   const saved = localStorage.getItem("products");

    //   if (saved && saved !== "null") {
    //     setProducts(JSON.parse(saved));
    //   } else {
    //     throw new Error("No saved products");
    //   }
    // } catch (err) {
    //   // fallback to mock
   
    // }
    console.log(mockProducts)
    setProducts(mockProducts);
    localStorage.setItem("products", JSON.stringify(mockProducts));

    // Load orders from localStorage
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    // Load political content from localStorage
    const savedPoliticalContent = localStorage.getItem("politicalContent");
    if (savedPoliticalContent) {
      setPoliticalContent(JSON.parse(savedPoliticalContent));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("politicalContent", JSON.stringify(politicalContent));
  }, [politicalContent]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
    };
    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product added successfully");
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    toast.success("Product updated successfully");
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.success("Product deleted successfully");
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev: any) =>
      prev.map((order: any) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success("Order status updated");
  };

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [...prev, newOrder]);
    toast.success("Order placed successfully");
    return newOrder;
  };

  const addPoliticalContent = (
    content: Omit<PoliticalContent, "id" | "createdAt">
  ) => {
    const newContent: PoliticalContent = {
      ...content,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    setPoliticalContent((prev) => [...prev, newContent]);
    toast.success("Political content added successfully");
  };

  const updatePoliticalContent = (content: PoliticalContent) => {
    setPoliticalContent((prev) =>
      prev.map((c) => (c.id === content.id ? content : c))
    );
    toast.success("Political content updated successfully");
  };

  const deletePoliticalContent = (contentId: string) => {
    setPoliticalContent((prev) => prev.filter((c) => c.id !== contentId));
    toast.success("Political content deleted successfully");
  };

  const togglePoliticalContentActive = (contentId: string) => {
    setPoliticalContent((prev) =>
      prev.map((content) =>
        content.id === contentId
          ? { ...content, active: !content.active }
          : content
      )
    );
    toast.success("Content status updated");
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        politicalContent,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addOrder,
        addPoliticalContent,
        updatePoliticalContent,
        deletePoliticalContent,
        togglePoliticalContentActive,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
