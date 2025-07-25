import React from 'react';
import UserHomeLayout from "../../user/components/UserHomeLayout";
import Products from "./components/Products";
import ContentWrapper from "../../user/components/ContentWrapper";

const UserHomePage = () => {
    return (
        <div>
            <UserHomeLayout>
                <ContentWrapper>
                    <Products/>
                </ContentWrapper>

            </UserHomeLayout>
        </div>
    );
};

export default UserHomePage;