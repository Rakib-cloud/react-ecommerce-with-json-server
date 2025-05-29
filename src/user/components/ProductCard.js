import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ProductCard = ({ product }) => {
    const { user, login } = useContext(AuthContext);

    const handleAddToCart = async () => {
        if (!user) {
            alert("Please login first to add to cart.");
            return;
        }

        try {
            const updatedCart = [...(user.cart || []), product];

            // Update cart in db.json
            await axios.patch(`http://localhost:5000/users/${user.id}`, {
                cart: updatedCart,
            });

            // Also update local user context
            const updatedUser = { ...user, cart: updatedCart };
            login(updatedUser); // Reuse login to update context + localStorage
            alert("Added to cart!");
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    return (
        <div className="bg-white shadow rounded p-4">
            <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full h-40 object-cover mb-3 rounded"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">৳{product.price}</p>
            <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white mt-3 px-4 py-1 rounded hover:bg-green-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
