// "use client";
// import DashboarLayouts from "@/components/layout/DashboarLayouts";
// import { FaShoppingCart } from "react-icons/fa";
// import { BsClockHistory, BsCheckCircle } from "react-icons/bs";
// import { AiOutlineShopping } from "react-icons/ai";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

// export default function Dashboard() {
//   const weeklySalesData = [
//     { date: "2025-02-17", sales: 2000 },
//     { date: "2025-02-18", sales: 3500 },
//     { date: "2025-02-19", sales: 2500 },
//     { date: "2025-02-20", sales: 4500 },
//     { date: "2025-02-21", sales: 3000 },
//     { date: "2025-02-22", sales: 5200 },
//     { date: "2025-02-23", sales: 2900 },
//     { date: "2025-02-24", sales: 6000 },
//   ];

//   const bestSellingProducts = [
//     { name: "Yellow Sweet Corn", value: 400 },
//     { name: "Mint", value: 300 },
//     { name: "Organic Baby Carrot", value: 200 },
//     { name: "Calabrese Squash", value: 250 },
//   ];

//   const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

//   return (
//     <DashboarLayouts>
//       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

//       {/* Sales Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//         <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md shadow">
//           <p className="text-sm text-gray-600">Today Orders</p>
//           <h2 className="text-xl font-bold">$284.04</h2>
//         </div>
//         <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md shadow">
//           <p className="text-sm text-gray-600">Yesterday Orders</p>
//           <h2 className="text-xl font-bold">$907.79</h2>
//         </div>
//         <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md shadow">
//           <p className="text-sm text-gray-600">This Month</p>
//           <h2 className="text-xl font-bold">$26345.93</h2>
//         </div>
//         <div className="bg-teal-100 border-l-4 border-teal-500 p-4 rounded-md shadow">
//           <p className="text-sm text-gray-600">Last Month</p>
//           <h2 className="text-xl font-bold">$22613.70</h2>
//         </div>
//         <div className="bg-green-200 border-l-4 border-green-600 p-4 rounded-md shadow">
//           <p className="text-sm text-gray-600">All-Time Sales</p>
//           <h2 className="text-xl font-bold">$503123.91</h2>
//         </div>
//       </div>

//       {/* Orders Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
//         <div className="flex items-center bg-white p-4 shadow rounded-md">
//           <FaShoppingCart className="text-orange-500 text-2xl" />
//           <div className="ml-3">
//             <p className="text-gray-600">Total Order</p>
//             <h2 className="text-xl font-bold">739</h2>
//           </div>
//         </div>
//         <div className="flex items-center bg-white p-4 shadow rounded-md">
//           <BsClockHistory className="text-red-500 text-2xl" />
//           <div className="ml-3">
//             <p className="text-gray-600">Orders Pending</p>
//             <h2 className="text-xl font-bold text-red-600">238</h2>
//           </div>
//         </div>
//         <div className="flex items-center bg-white p-4 shadow rounded-md">
//           <AiOutlineShopping className="text-blue-500 text-2xl" />
//           <div className="ml-3">
//             <p className="text-gray-600">Orders Processing</p>
//             <h2 className="text-xl font-bold">111</h2>
//           </div>
//         </div>
//         <div className="flex items-center bg-white p-4 shadow rounded-md">
//           <BsCheckCircle className="text-green-500 text-2xl" />
//           <div className="ml-3">
//             <p className="text-gray-600">Orders Delivered</p>
//             <h2 className="text-xl font-bold">300</h2>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {/* Weekly Sales Chart */}
//         <div className="bg-white p-6 shadow rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Weekly Sale</h2>
//           <LineChart width={400} height={250} data={weeklySalesData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="sales" stroke="#00C49F" strokeWidth={2} />
//           </LineChart>
//         </div>

//         {/* Best Selling Products Pie Chart */}
//         <div className="bg-white p-6 shadow rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Best Selling Products</h2>
//           <PieChart width={400} height={250}>
//             <Pie
//               data={bestSellingProducts}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {bestSellingProducts.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend />
//           </PieChart>
//         </div>
//       </div>
//     </DashboarLayouts>
//   );
// }


"use client";
import DashboarLayouts from "@/components/layout/DashboarLayouts";
import { FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { BsClockHistory, BsCheckCircle, BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart, Pie, Cell, Legend, BarChart, Bar, ResponsiveContainer 
} from "recharts";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

export default function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://arabian-elegance-backend2.vercel.app/api/v1/order?page=1&limit=5"
        );
        const data = await response.json();
        if (data.success) {
          setRecentOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const weeklySalesData = [
    { date: "2025-02-17", sales: 2000 },
    { date: "2025-02-18", sales: 3500 },
    { date: "2025-02-19", sales: 2500 },
    { date: "2025-02-20", sales: 4500 },
    { date: "2025-02-21", sales: 3000 },
    { date: "2025-02-22", sales: 5200 },
    { date: "2025-02-23", sales: 2900 },
    { date: "2025-02-24", sales: 6000 },
  ];

  const bestSellingProducts = [
    { name: "Yellow Sweet Corn", value: 400 },
    { name: "Mint", value: 300 },
    { name: "Organic Baby Carrot", value: 200 },
    { name: "Calabrese Squash", value: 250 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 62000 },
    { month: "May", revenue: 71000 },
    { month: "Jun", revenue: 85000 },
  ];

  const orderStatusData = [
    { status: "Pending", count: 238, color: "#FFBB28" },
    { status: "Processing", count: 111, color: "#0088FE" },
    { status: "Delivered", count: 300, color: "#00C49F" },
    { status: "Cancelled", count: 90, color: "#FF8042" },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#8884d8"];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-sm">
            <span className="text-gray-600">Value: </span>
            <span className="font-medium">₹{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboarLayouts>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm">Your business performance summary</p>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {[
          { 
            title: "Today Orders", 
            value: "₹284.04", 
            icon: <FaRupeeSign className="text-green-500 text-xl" />,
            change: "+2.5%",
            bg: "bg-green-50",
            border: "border-green-200"
          },
          { 
            title: "Yesterday Orders", 
            value: "₹907.79", 
            icon: <BsCurrencyDollar className="text-orange-500 text-xl" />,
            change: "-1.2%",
            bg: "bg-orange-50",
            border: "border-orange-200"
          },
          { 
            title: "This Month", 
            value: "₹26,345.93", 
            icon: <FaShoppingCart className="text-blue-500 text-xl" />,
            change: "+5.3%",
            bg: "bg-blue-50",
            border: "border-blue-200"
          },
          { 
            title: "Last Month", 
            value: "₹22,613.70", 
            icon: <BsBoxSeam className="text-teal-500 text-xl" />,
            change: "+3.8%",
            bg: "bg-teal-50",
            border: "border-teal-200"
          },
          { 
            title: "All-Time Sales", 
            value: "₹503,123.91", 
            icon: <BsCheckCircle className="text-green-600 text-xl" />,
            change: "+12.7%",
            bg: "bg-green-100",
            border: "border-green-300"
          }
        ].map((card, index) => (
          <div 
            key={index} 
            className={`${card.bg} border-l-4 ${card.border} p-4 rounded-md shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <h2 className="text-xl font-bold mt-1">{card.value}</h2>
              </div>
              <div className="bg-white p-2 rounded-full shadow-sm">
                {card.icon}
              </div>
            </div>
            <p className={`text-xs mt-2 ${
              card.change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}>
              {card.change} from previous period
            </p>
          </div>
        ))}
      </div>

      {/* Orders Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: "Total Order", 
            value: "739", 
            icon: <FaShoppingCart className="text-orange-500 text-2xl" />,
            bg: "bg-white"
          },
          { 
            title: "Orders Pending", 
            value: "238", 
            icon: <BsClockHistory className="text-red-500 text-2xl" />,
            bg: "bg-white"
          },
          { 
            title: "Orders Processing", 
            value: "111", 
            icon: <AiOutlineShopping className="text-blue-500 text-2xl" />,
            bg: "bg-white"
          },
          { 
            title: "Orders Delivered", 
            value: "300", 
            icon: <BsCheckCircle className="text-green-500 text-2xl" />,
            bg: "bg-white"
          }
        ].map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bg} flex items-center p-4 shadow-sm rounded-md border border-gray-100 hover:shadow-md transition-shadow`}
          >
            <div className="p-3 rounded-full bg-gray-100 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <h2 className="text-xl font-bold mt-1">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Weekly Sales Chart */}
        <div className="bg-white p-6 shadow rounded-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Sales</h2>
            <div className="flex space-x-2">
              <button className="text-xs px-2 py-1 bg-gray-100 rounded">Week</button>
              <button className="text-xs px-2 py-1 bg-gray-100 rounded">Month</button>
              <button className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">Year</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => format(new Date(value), 'MMM dd')}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#00C49F" 
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6, stroke: "#00C49F" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Products Pie Chart */}
        <div className="bg-white p-6 shadow rounded-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Best Selling Products</h2>
          <div className="flex">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={bestSellingProducts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bestSellingProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 pl-4 flex flex-col justify-center">
              {bestSellingProducts.map((product, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">{product.name}</span>
                  <span className="ml-auto font-medium">₹{product.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-6 shadow rounded-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`₹${value}`, 'Revenue']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar 
                dataKey="revenue" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              >
                {revenueData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#colorGradient${index})`} 
                  />
                ))}
              </Bar>
              <defs>
                {revenueData.map((entry, index) => (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`colorGradient${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0.2} />
                  </linearGradient>
                ))}
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 shadow rounded-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value}`, 'Orders']} />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {orderStatusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="text-sm text-gray-600">{status.status}</span>
                <span className="ml-auto font-medium">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 shadow rounded-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All Orders
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order._id.slice(-6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.name}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.orderDate), 'dd MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.paymentStatus === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboarLayouts>
  );
}