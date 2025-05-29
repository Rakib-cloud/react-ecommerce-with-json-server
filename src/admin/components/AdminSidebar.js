import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <ul className="space-y-2">
                <li className="mb-2">
                    <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/add-product" className="hover:underline">Add Product</Link>
                </li>
                <li>
                    <Link to="/admin/products" className="hover:underline">Product List</Link>
                </li>
                <li>
                    <Link to="/admin/orders" className="hover:underline">Order List</Link>
                </li>
                <li>
                    <Link to="/admin/users" className="hover:underline">User List</Link>
                </li>


            </ul>
        </div>
    );
};

export default AdminSidebar;
