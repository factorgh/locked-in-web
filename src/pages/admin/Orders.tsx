import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Order } from '../../types';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link to="/admin" className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
          Manage Orders
        </h1>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative md:w-1/3">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No orders found matching your criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div 
                className="p-4 border-b cursor-pointer flex justify-between items-center"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                  <div>
                    <span className="text-sm text-gray-500">Order ID:</span>
                    <span className="font-medium ml-2">#{order.id.slice(0, 8)}</span>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className="text-sm text-gray-500">Date:</span>
                    <span className="font-medium ml-2">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className="text-sm text-gray-500">Customer:</span>
                    <span className="font-medium ml-2">{order.customer.name}</span>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className="text-sm text-gray-500">Total:</span>
                    <span className="font-medium ml-2">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <ChevronDown 
                    className={`transition-transform ${expandedOrder === order.id ? 'transform rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                          <div className="bg-white p-4 rounded-lg">
                            <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                            <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                            <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                          </div>
                          
                          <h3 className="text-lg font-semibold mt-6 mb-3">Order Status</h3>
                          <div className="bg-white p-4 rounded-lg">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Update Status
                            </label>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                          <div className="bg-white p-4 rounded-lg">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex items-center py-3 border-b last:border-0">
                                <div className="h-16 w-16 flex-shrink-0 mr-4">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-full w-full object-cover rounded-md"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{item.product.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {item.quantity} x ${item.product.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="font-medium">
                                  ${(item.quantity * item.product.price).toFixed(2)}
                                </div>
                              </div>
                            ))}
                            
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-gray-500">
                                <span>Shipping:</span>
                                <span>Free</span>
                              </div>
                              <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
