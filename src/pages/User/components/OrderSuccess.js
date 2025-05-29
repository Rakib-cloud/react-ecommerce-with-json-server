import React from "react";
import { useNavigate } from "react-router-dom";
import UserHomeLayout from "../../../user/components/UserHomeLayout";


const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <UserHomeLayout>
            <div className="flex flex-col items-center justify-center h-96">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
                <button
                    onClick={() => navigate("/profile")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go to Profile
                </button>
            </div>
        </UserHomeLayout>
    );
};

export default OrderSuccess;
