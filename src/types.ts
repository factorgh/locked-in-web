export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  stock: number;
};

export type Order = {
  id: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  customer: {
    name: string;
    email: string;
    address: string;
  };
  total: number;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
};

export type PoliticalContent = {
  id: string;
  title: string;
  content: string;
  mediaType: "image" | "video" | "none";
  mediaUrl?: string;
  createdAt: string;
  active: boolean;
};
