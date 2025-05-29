import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminUserListPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users", err));
    }, []);

    return (
        <AdminLayout>
            <div className="p-6 ">
                <h2 className="text-2xl font-bold mb-4">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-2">{user.title || user.username}</td>
                                <td className="px-4 py-2">{user.email || "N/A"}</td>
                                <td className="px-4 py-2">{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>

    );
};

export default AdminUserListPage;
