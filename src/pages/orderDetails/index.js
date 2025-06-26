// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import React, { useState, useEffect } from 'react';

// export default function OrderDetails() {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const order = localStorage.getItem('orderData');
//     if (order) {
//       setOrderDetails(JSON.parse(order));
//     }
//     const items = localStorage.getItem('cart');
//     if (items) {
//       setCartItems(JSON.parse(items));
//     }
//   }, []);

//   const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
//   const shippingCost = 120.00; // Example shipping cost
//   const total = subtotal + shippingCost;

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 py-10">
//         <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//           <h1 className="text-2xl font-bold mb-6">Order Details</h1>
//           {orderDetails ? (
//             <>
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold">Billing Address</h2>
//                 <p className="text-gray-700">{orderDetails.fullName}</p>
//                 <p className="text-gray-700">{orderDetails.streetAddress}</p>
//                 <p className="text-gray-700">{orderDetails.city}, {orderDetails.division}</p>
//                 <p className="text-gray-700">{orderDetails.phone}</p>
//                 <p className="text-gray-700">{orderDetails.email}</p>
//               </div>
//               <div className="border-t pt-4">
//                 <h2 className="text-lg font-semibold">Products:</h2>
//                 {cartItems.length > 0 ? (
//                   cartItems.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center border-b py-2">
//                       <div>
//                         <p className="text-gray-700">{item.name} × {item.quantity}</p>
//                         <p className="text-gray-500">SIZE: {item.size}</p>
//                       </div>
//                       <p className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No items in cart.</p>
//                 )}
//               </div>
//               <div className="mt-6 space-y-2">
//                 <div className="flex justify-between">
//                   <p>Subtotal:</p>
//                   <p>${subtotal.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p>Shipping:</p>
//                   <p>${shippingCost.toFixed(2)} via Outside Dhaka</p>
//                 </div>
//                 <div className="flex justify-between font-bold">
//                   <p>Total:</p>
//                   <p>${total.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <h2 className="text-lg font-semibold">Payment Method:</h2>
//                 <p className="text-gray-700">Cash on delivery</p>
//               </div>
//               <div className="mt-6">
//                 <h2 className="text-lg font-semibold">Thank you. Your order has been received.</h2>
//                 <p className="text-gray-700">Order number: 206826</p>
//                 <p className="text-gray-700">Date: February 21, 2025</p>
//                 <p className="text-gray-700">Total: ${total.toFixed(2)}</p>
//                 <p className="text-gray-700">Payment method: Cash on delivery</p>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500">No order details found.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useQuery } from '@tanstack/react-query';




const OrderDetails = () => {
  // const navigate = useNavigate();
  
  // Fetch order data from localStorage
  // const orderData = JSON.parse(localStorage.getItem('orderData')) 
  // React Query for API call

const orderData = [];
const data = {};
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-8 text-sm text-gray-600">
          <button className="hover:text-orange-600">হোম</button>
          {' > '} 
          <span className="text-orange-600">অর্ডার সম্পন্ন</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
          <h1 className="text-3xl font-bold mb-8 text-orange-800">অর্ডার বিবরণ</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">পণ্য তালিকা</h2>
              {orderData ?.products?.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-orange-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">পরিমাণ: {item.quantity}</p>
                    {item.size && <p className="text-sm text-gray-500">সাইজ: {item.size}</p>}
                  </div>
                  <div className="font-medium text-orange-700">৳{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}

              <div className="pt-6 border-t border-orange-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>সাবটোটাল</span>
                    <span>৳{(data?.totalAmount - 120).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>শিপিং</span>
                    <span>৳120</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3">
                    <span className="text-orange-800">মোট</span>
                    <span className="text-orange-800">৳{data?.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">বিলিং ঠিকানা</h2>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-gray-700">{data?.name}</p>
                  <p className="text-gray-700">{data?.streetAddress}</p>
                  <p className="text-gray-700">{data?.thana}, {data?.district}</p>
                  <p className="text-gray-700">{data?.village}</p>
                  <p className="text-gray-700">ফোন: {data?.phone}</p>
                  {data?.email && <p className="text-gray-700">ইমেইল: {data?.email}</p>}
                </div>
              </div>

              <div className="bg-orange-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-4">অর্ডার স্বীকৃতি</h3>
                <div className="space-y-2 text-gray-700">
                  <p>অর্ডার নম্বর: {data?._id}</p>
                  <p>তারিখ: {new Date(data?.orderDate).toLocaleDateString()}</p>
                  <p>পেমেন্ট পদ্ধতি: ক্যাশ অন ডেলিভারি</p>
                  <p className="pt-4 font-semibold text-green-600">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg text-center">
            <p className="text-orange-800">
              কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন: <br />
              <a href="tel:+8801825639631" className="font-semibold hover:underline">+880 1825 639631</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetails;