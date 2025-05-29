import React from 'react';
import UserHomeLayout from "../../user/components/UserHomeLayout";
import Products from "./components/Products";

const UserHomePage = () => {
    return (
        <div>
            <UserHomeLayout>
                <Products/>
            </UserHomeLayout>
        </div>
    );
};

export default UserHomePage;