import React from "react";
import UserNavbar from "../components/UserNavbar";
import UserFooter from "../components/UserFooter";

const UserHomeLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <UserNavbar />
            <main className="flex-1 p-6 bg-gray-100">{children}</main>
            <UserFooter />
        </div>
    );
};

export default UserHomeLayout;
