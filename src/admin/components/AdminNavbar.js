import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminNavbar;
