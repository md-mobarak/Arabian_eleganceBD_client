
'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { baseUrl } from '@/utils/api';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  // Load cart items and calculate total
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, []);

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(subtotal + 120); // Shipping cost
  };

  // React Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (orderData) => 
      axios.post(`${baseUrl}/order`, orderData),
    onSuccess: (data) => {
      localStorage.removeItem('cart');
      // console.log(toast)
      toast.success('Order placed successfully!');
      router.push(`/shop`);
    },
    onError: (error) => {
      toast.error('Order failed!');
      console.error('Error details:', error.response?.data || error.message);
    }
  });

  const onSubmit = (formData) => {
    const orderData = {
      ...formData,
      products: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total,
      paymentStatus: 'unpaid',
      status: 'pending'
    };
    // console.log(orderData)
    mutate(orderData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
            <h2 className="text-3xl font-bold mb-8 text-orange-800">Billing Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 lg:gap-4 md:gap-6">
                {[
                  { label: 'Full Name *', name: 'name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { 
                    label: 'Phone *', 
                    name: 'phone', 
                    type: 'tel',
                    pattern: /^[0-9]{11}$/
                  },
                  { label: 'District *', name: 'district', type: 'text' },
                  { label: 'Thana *', name: 'thana', type: 'text' },
                  { label: 'Village *', name: 'village', type: 'text' },
                ].map((field) => (
                  <div key={field.name} className="w-full">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {field.label}
                      <input
                        {...register(field.name, { 
                          required: field.label.includes('*'),
                          ...(field.name === 'phone' && {
                            pattern: {
                              value: /^[0-9]{11}$/,
                              message: "Must be 11 digits"
                            }
                          })
                        })}
                        type={field.type}
                        className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                      />
                    </label>
                    {errors[field.name] && (
                      <span className="text-red-600 text-sm mt-1">
                        {errors[field.name]?.type === 'pattern' 
                          ? "Must be 11 digits" 
                          : "This field is required"}
                      </span>
                    )}
                  </div>
                ))}

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Street Address *
                    <input
                      {...register('streetAddress', { required: true })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
                    />
                  </label>
                  {errors.streetAddress && (
                    <span className="text-red-600 text-sm mt-1">This field is required</span>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Additional Notes
                    <textarea
                      {...register('additionalInformation')}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
                      rows={3}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending || cartItems.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isPending ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="cursor-pointer bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-100 h-fit">
            <h2 className="text-3xl font-bold mb-6 text-orange-800">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800" title={item.name}>{item?.name?.slice(0,15)}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-orange-700">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-orange-200">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>৳{(total - 120).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>৳120</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3">
                  <span className="text-orange-800">Total</span>
                  <span className="text-orange-800">৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}