import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1">
                <AdminNavbar />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
