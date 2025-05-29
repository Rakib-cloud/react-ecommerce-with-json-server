import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserHomeLayout from "../../user/components/UserHomeLayout";
import axios from "axios";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?.id) {
            axios.get(`http://localhost:5000/orders?userId=${user.id}`)
                .then(res => setOrders(res.data))
                .catch(err => console.error("Error fetching orders", err));
        }
    }, [user]);

    if (!user) return <div className="text-center mt-10">Please login first.</div>;

    return (
        <UserHomeLayout>
            <div className="max-w-5xl mx-auto p-6">
                {/* Profile Info */}
                <div className="bg-white rounded shadow p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    <p><strong>Name:</strong> {user.name || user.username}</p>
                    <p><strong>Email:</strong> {user.email || "N/A"}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>

                {/* Order Table */}
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-xl font-bold mb-4">My Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-600">You have no orders.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Items</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => {
                                    const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                                    return (
                                        <tr key={order.id}>
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.id}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{new Date(order.date).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                {order.items.map((item, index) => (
                                                    <div key={index}>
                                                        {item.title} (x{item.quantity || 1})
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-semibold text-green-600">৳{total}</td>
                                            <td className="px-4 py-2 text-sm text-blue-500">{order.status}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </UserHomeLayout>
    );
};

export default ProfilePage;
