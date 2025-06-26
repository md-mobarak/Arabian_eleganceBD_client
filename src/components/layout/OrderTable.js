"use client";
import React from 'react'

function OrderTable() {
    const orders = [
        { id: 1, customer: "John Doe", status: "Pending" },
        { id: 2, customer: "Jane Smith", status: "Shipped" },
      ];
  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Order ID</th>
        <th className="border p-2">Customer</th>
        <th className="border p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {orders?.map((order) => (
        <tr key={order.id} className="border">
          <td className="border p-2 text-center">{order.id}</td>
          <td className="border p-2 text-center">{order.customer}</td>
          <td className="border p-2 text-center">{order.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default OrderTable