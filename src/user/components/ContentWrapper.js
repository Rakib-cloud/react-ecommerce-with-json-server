import React from "react";


const ContentWrapper = ({ children }) => {
    return (
        <div className="mt-5 mb-6 p-6 bg-gray-50 container mx-auto">
            {children}
        </div>
    );
};

export default ContentWrapper;
