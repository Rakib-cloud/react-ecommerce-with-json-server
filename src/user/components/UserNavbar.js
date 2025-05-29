import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {CiShoppingCart} from "react-icons/ci";

const UserNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return (
        <nav className="bg-gray-400 text-white px-6 py-3 flex justify-between items-center shadow">
            <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                Dream Wear
            </div>

            <div className="flex items-center gap-6">
                {!user ? (
                    <>
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link to="/register" className="hover:underline">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Link to="/cart" className="relative">
                                <CiShoppingCart size={28}/>
                                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center">
                                    <span
                                        className="">{user.cart?.length}</span>
                                </div>

                            </Link>
                            {/* Use a fallback icon if no profile image */}
                            <img
                                src={user.image || "https://i.pravatar.cc/30"}
                                alt="profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <Link to="/profile" className="hover:underline">
                                {user.username}
                            </Link>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default UserNavbar;
