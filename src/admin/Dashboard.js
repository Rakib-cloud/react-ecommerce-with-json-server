import React from "react";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
            <p className="mt-2">Here you can manage products.</p>
        </AdminLayout>
    );
};

export default Dashboard;
