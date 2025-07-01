"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { 
  FaEdit, FaTrash, FaSearch, FaFilter, FaInfoCircle, 
  FaCalendarAlt, FaTimes, FaUser, FaMapMarkerAlt, FaBox 
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { baseUrl } from "@/utils/api";

const OrderManagement = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const limit = 10;

  // Authentication State
  const [authData, setAuthData] = useState({
    accessToken: "",
    userRole: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthData({
        accessToken: localStorage.getItem("accessToken") || "",
        userRole: localStorage.getItem("userRole") || ""
      });
    }
  }, []);

  // API Headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch Orders Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", search, status, paymentStatus, page, startDate, endDate],
    queryFn: async () => {
      let url = `${baseUrl}/order?page=${page}&limit=${limit}`;
      
      if (search) url += `&search=${search}`;
      if (status) url += `&status=${status}`;
      if (paymentStatus) url += `&paymentStatus=${paymentStatus}`;
      if (startDate) url += `&startDate=${startDate.toISOString()}`;
      if (endDate) url += `&endDate=${endDate.toISOString()}`;

      const res = await fetch(url, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    }
  });

  // Fetch Order Details
  const fetchOrderDetails = async (orderId) => {
    const res = await fetch(`${baseUrl}/order/${orderId}`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch order details");
    return res.json();
  };

  // View Order Details Handler
  const handleViewDetails = async (orderId) => {
    try {
      const details = await fetchOrderDetails(orderId);
      setOrderDetails(details.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update Order Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`${baseUrl}/order/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order updated successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Update failed");
    }
  });

  // Delete Order Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${baseUrl}/api/v1/order/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Delete failed");
    }
  });

  // Handle Filters Reset
  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPaymentStatus("");
    setStartDate(null);
    setEndDate(null);
    setPage(1);
  };

  // Status Badge Styles
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return `${styles[status]} px-3 py-1 rounded-full text-xs font-medium`;
  };

  // Payment Status Badge
  const getPaymentBadge = (status) => {
    return status === "paid" 
      ? "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium";
  };

  // Handle Delete
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this order?",
      buttons: [
        { 
          label: "Yes", 
          className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2",
          onClick: () => deleteMutation.mutate(id) 
        },
        { 
          label: "No",
          className: "bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        }
      ],
      overlayClassName: "backdrop-blur-sm"
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <button
          onClick={resetFilters}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 transition-colors"
        >
          <FaTimes className="text-sm" /> Reset Filters
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
        
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="absolute right-3 top-3.5 pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
        </div>

        <div className="relative">
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <div className="absolute right-3 top-3.5 pointer-events-none">
            <FaFilter className="text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <div className="relative w-full">
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText="Start Date"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative w-full">
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              placeholderText="End Date"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        {isLoading ? (
          <div className="p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-4">
                <Skeleton height={60} />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <div className="text-red-500 text-lg mb-2">Error loading orders</div>
            <p className="text-gray-600">Please try again later</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.orders?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{order.email || 'No email'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">+{order.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.district}, {order.thana}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">৳{order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getPaymentBadge(order.paymentStatus)}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleViewDetails(order._id)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <FaInfoCircle className="text-lg" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                        title="Edit Order"
                      >
                        <FaEdit className="text-lg"/>
                      </button>
                      {["admin", "manager"].includes(authData.userRole) && (
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete Order"
                        >
                          <FaTrash className="text-lg"/>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t bg-gray-50">
              <span className="text-sm text-gray-700 mb-2 md:mb-0">
                Showing {data?.orders?.length} of {data?.totalOrders} orders
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <span>Previous</span>
                </button>
                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-medium">
                  Page {page} of {data?.totalPages}
                </div>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <span>Next</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-[0.98] group-hover:scale-100">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Order</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  status: formData.get("status"),
                  paymentStatus: formData.get("paymentStatus"),
                  additionalInformation: formData.get("additionalInformation")
                };
                updateMutation.mutate({ id: selectedOrder._id, data: updatedData });
              }}
              className="space-y-4 p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Order Status</label>
                  <select
                    name="status"
                    defaultValue={selectedOrder?.status}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Payment Status</label>
                  <select
                    name="paymentStatus"
                    defaultValue={selectedOrder?.paymentStatus}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Order Notes</label>
                <textarea
                  name="additionalInformation"
                  defaultValue={selectedOrder?.additionalInformation}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Add any additional notes for this order..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  disabled={updateMutation.isLoading}
                >
                  {updateMutation.isLoading ? (
                    <span>Updating...</span>
                  ) : (
                    <>
                      <FaEdit />
                      <span>Update Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isDetailsModalOpen && orderDetails && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-[0.98] group-hover:scale-100">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaUser className="text-blue-600 text-xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Customer Information</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{orderDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{orderDetails.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+{orderDetails.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-green-600 text-xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Shipping Address</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">District</p>
                      <p className="font-medium">{orderDetails.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thana</p>
                      <p className="font-medium">{orderDetails.thana}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{orderDetails.streetAddress}, {orderDetails.village}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 p-5 bg-gray-50">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaBox className="text-purple-600 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Order Items</h4>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {orderDetails?.products?.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-5">
                      <div className="w-16 h-16 relative bg-gray-100 rounded-lg flex-shrink-0">
                        {product?.product?.images ? (
                          <Image
                            src={product?.product?.images}
                            alt={product?.product?.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FaBox className="text-2xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product?.product?.title || 'Product not available'}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {product?.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ৳{product?.price?.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Total: ৳{(product?.price * product?.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Order Status</p>
                      <span className={getStatusBadge(orderDetails?.status)}>
                        {orderDetails?.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Payment Status</p>
                      <span className={getPaymentBadge(orderDetails?.paymentStatus)}>
                        {orderDetails?.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-5 rounded-xl flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-lg">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">৳{orderDetails?.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {orderDetails?.additionalInformation && (
                <div className="bg-gray-50 p-5 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Notes</h4>
                  <p className="text-gray-700">
                    {orderDetails?.additionalInformation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;