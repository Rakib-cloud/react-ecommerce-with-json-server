import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminOrderListPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error("Error fetching orders", err));
    }, []);

    const updateStatus = (orderId, newStatus) => {
        axios.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus })
            .then(() => {
                setOrders(prev =>
                    prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
                );
            })
            .catch(err => console.error("Failed to update order status", err));
    };

    const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    console.log('orders',orders)

    return (
        <AdminLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">All Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Order ID</th>
                            <th className="px-4 py-2 text-left">User ID</th>
                            <th className="px-4 py-2 text-left">Items</th>
                            <th className="px-4 py-2 text-left">Total</th>
                            <th className="px-4 py-2 text-left">Shipping Info</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {orders.map(order => {
                            const total = order.items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
                            return (
                                <tr key={order.id}>
                                    <td className="px-4 py-2">{order.id}</td>
                                    <td className="px-4 py-2">{order.userId}</td>
                                    <td className="px-4 py-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx}>
                                                {item.title} (x{item.quantity || 1})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 font-semibold text-green-600">৳{total}</td>
                                    <td className="px-4 py-2">
                                        <p className="font-semibold">{order.info.name}</p>
                                        <p>{order.info.address}</p>
                                        <p>{order.info.phone}</p>
                                    </td>
                                    <td className="px-4 py-2">{order.status}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            className="border rounded p-1"
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>

    );
};

export default AdminOrderListPage;
