

"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaInfoCircle } from "react-icons/fa";
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
    return `${styles[status]} px-2 py-1 rounded-full text-sm`;
  };

  // Payment Status Badge
  const getPaymentBadge = (status) => {
    return status === "paid" 
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm";
  };

  // Handle Delete
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure?",
      buttons: [
        { label: "Yes", onClick: () => deleteMutation.mutate(id) },
        { label: "No" }
      ]
    });
  };
 console.log(orderDetails)
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <RxCross2 /> Reset Filters
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Payment Statuses</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <div className="flex items-center gap-2">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText="Start Date"
            className="w-full p-2 border rounded-lg"
          />
          <span>-</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText="End Date"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <Skeleton height={30} count={6} />
            </div>
          ))
        ) : isError ? (
          <div className="p-6 text-red-500">Error loading orders</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Contact</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Payment</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">+{order.phone}</p>
                      <p className="text-sm text-gray-500">{order.district}, {order.thana}</p>
                    </td>
                    <td className="px-6 py-4">${order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getPaymentBadge(order.paymentStatus)}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleViewDetails(order._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaInfoCircle className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit className="text-xl"/>
                      </button>
                      {["admin", "manager"].includes(authData.userRole) && (
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="text-xl"/>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-700">
                Showing {data?.orders?.length} of {data?.totalOrders} orders
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Order</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RxCross2 className="text-2xl" />
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
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Order Status</label>
                  <select
                    name="status"
                    defaultValue={selectedOrder?.status}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Payment Status</label>
                  <select
                    name="paymentStatus"
                    defaultValue={selectedOrder?.paymentStatus}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  name="additionalInformation"
                  defaultValue={selectedOrder?.additionalInformation}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isDetailsModalOpen && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RxCross2 className="text-2xl" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Customer Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {orderDetails.name}</p>
                  <p><span className="font-medium">Email:</span> {orderDetails.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> +{orderDetails.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">District:</span> {orderDetails.district}</p>
                  <p><span className="font-medium">Thana:</span> {orderDetails.thana}</p>
                  <p><span className="font-medium">Village:</span> {orderDetails.village}</p>
                  <p><span className="font-medium">Address:</span> {orderDetails.streetAddress}</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-2">Products</h4>
                <div className="space-y-4">
                  {orderDetails?.products?.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 border-b pb-4">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={product?.product?.images}
                          alt={product?.product?.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product?.product?.title}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {product?.quantity}
                        </p>
                        <p className="text-sm">
                          Price: ৳{product?.price?.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          Total: ৳{(product?.price * product?.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p><span className="font-medium">Order Date:</span> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                    <p className={getStatusBadge(orderDetails?.status)}>
                      Status: {orderDetails?.status}
                    </p>
                  </div>
                  <div>
                    <p className={getPaymentBadge(orderDetails?.paymentStatus)}>
                      Payment: {orderDetails?.paymentStatus}
                    </p>
                    <p className="text-xl font-bold mt-2">
                      Total Amount: ৳{orderDetails?.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {orderDetails?.additionalInformation && (
                <div className="md:col-span-2">
                  <h4 className="text-lg font-semibold mb-2">Additional Notes</h4>
                  <p className="bg-gray-50 p-4 rounded-lg">
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