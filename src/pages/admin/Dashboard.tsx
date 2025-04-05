import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Package, ShoppingBag } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AdminDashboard = () => {
  const { products, orders, politicalContent } = useAdmin();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [activeContent, setActiveContent] = useState(0);

  useEffect(() => {
    // Calculate total revenue
    const revenue = orders.reduce((total, order) => total + order.total, 0);
    setTotalRevenue(revenue);

    // Count pending orders
    const pending = orders.filter((order) => order.status === "pending").length;
    setPendingOrders(pending);

    // Count active political content
    const active = politicalContent.filter((content) => content.active).length;
    setActiveContent(active);
  }, [orders, politicalContent]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Admin Dashboard
        </h1>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Link
            to="/admin/products"
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            View Orders
          </Link>
          <Link
            to="/admin/political-content"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Political Content
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <ShoppingBag className="text-pink-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{orders.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <h3 className="text-2xl font-bold mt-1">{pendingOrders}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Package className="text-yellow-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Political Content</p>
              <h3 className="text-2xl font-bold mt-1">{activeContent}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FileText className="text-purple-600" size={20} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-pink-600 flex items-center hover:underline"
          >
            View All
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Political Content & Low Stock Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Political Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Political Content</h2>
            <Link
              to="/admin/political-content"
              className="text-pink-600 flex items-center hover:underline"
            >
              Manage
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>

          {politicalContent.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No political content added yet
            </p>
          ) : (
            <div className="space-y-4">
              {politicalContent.slice(0, 3).map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{content.title}</h3>
                    <span
                      className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                        content.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {content.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {content.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Low Stock Products</h2>
            <Link
              to="/admin/products"
              className="text-pink-600 flex items-center hover:underline"
            >
              View All
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>

          {products.filter((p) => p.stock < 10).length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No products with low stock
            </p>
          ) : (
            <div className="space-y-4">
              {products
                .filter((product) => product.stock < 10)
                .slice(0, 3)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-4 border rounded-lg"
                  >
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    <span
                      className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                        product.stock < 5
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
