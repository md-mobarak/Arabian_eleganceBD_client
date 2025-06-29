"use client";
import DashboarLayouts from "@/components/layout/DashboarLayouts";
import { FaShoppingCart } from "react-icons/fa";
import { BsClockHistory, BsCheckCircle } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
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

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  return (
    <DashboarLayouts>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-md shadow">
          <p className="text-sm text-gray-600">Today Orders</p>
          <h2 className="text-xl font-bold">$284.04</h2>
        </div>
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md shadow">
          <p className="text-sm text-gray-600">Yesterday Orders</p>
          <h2 className="text-xl font-bold">$907.79</h2>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md shadow">
          <p className="text-sm text-gray-600">This Month</p>
          <h2 className="text-xl font-bold">$26345.93</h2>
        </div>
        <div className="bg-teal-100 border-l-4 border-teal-500 p-4 rounded-md shadow">
          <p className="text-sm text-gray-600">Last Month</p>
          <h2 className="text-xl font-bold">$22613.70</h2>
        </div>
        <div className="bg-green-200 border-l-4 border-green-600 p-4 rounded-md shadow">
          <p className="text-sm text-gray-600">All-Time Sales</p>
          <h2 className="text-xl font-bold">$503123.91</h2>
        </div>
      </div>

      {/* Orders Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="flex items-center bg-white p-4 shadow rounded-md">
          <FaShoppingCart className="text-orange-500 text-2xl" />
          <div className="ml-3">
            <p className="text-gray-600">Total Order</p>
            <h2 className="text-xl font-bold">739</h2>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 shadow rounded-md">
          <BsClockHistory className="text-red-500 text-2xl" />
          <div className="ml-3">
            <p className="text-gray-600">Orders Pending</p>
            <h2 className="text-xl font-bold text-red-600">238</h2>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 shadow rounded-md">
          <AiOutlineShopping className="text-blue-500 text-2xl" />
          <div className="ml-3">
            <p className="text-gray-600">Orders Processing</p>
            <h2 className="text-xl font-bold">111</h2>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 shadow rounded-md">
          <BsCheckCircle className="text-green-500 text-2xl" />
          <div className="ml-3">
            <p className="text-gray-600">Orders Delivered</p>
            <h2 className="text-xl font-bold">300</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Weekly Sales Chart */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Sale</h2>
          <LineChart width={400} height={250} data={weeklySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#00C49F" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Best Selling Products Pie Chart */}
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Best Selling Products</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={bestSellingProducts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {bestSellingProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </DashboarLayouts>
  );
}
