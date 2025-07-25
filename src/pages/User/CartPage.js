import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import UserHomeLayout from "../../user/components/UserHomeLayout";
import {useNavigate} from "react-router-dom";

const CartPage = () => {
    const { user, login } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [checkoutInfo, setCheckoutInfo] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const initialCart = (user?.cart || []).map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }));
        setCart(initialCart);
    }, [user]);

    const updateCartOnServer = async (updatedCart) => {
        try {
            await axios.patch(`http://localhost:3000/users/${user.id}`, {
                cart: updatedCart,
            });
            const updatedUser = { ...user, cart: updatedCart };
            login(updatedUser);
            setCart(updatedCart);
        } catch (err) {
            console.error("Failed to update cart", err);
            alert("Failed to update cart. Try again.");
        }
    };

    const handleQuantityChange = (index, amount) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = Math.max(1, (updatedCart[index].quantity || 1) + amount);
        updateCartOnServer(updatedCart);
    };

    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCartOnServer(updatedCart);
    };

    const handleInputChange = (e) => {
        setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!checkoutInfo.name || !checkoutInfo.phone || !checkoutInfo.address) {
            alert("Please fill all checkout information.");
            return;
        }

        if (cart.length === 0) {
            alert("Cart is empty. Cannot place order.");
            return;
        }

        const validItems = cart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }));

        try {
            const newOrder = {
                userId: user.id,
                info: checkoutInfo,
                items: validItems,
                date: new Date().toISOString(),
                status: "Pending",
            };

            await axios.post("http://localhost:3000/orders", newOrder);
            await updateCartOnServer([]);

            setCheckoutInfo({ name: "", phone: "", address: "" });
            navigate("/order-success"); // ✅ redirect here
        } catch (err) {
            console.error("Order failed", err);
            alert("Order failed. Please try again.");
        }
    };


    const totalPrice = cart.reduce(
        (sum, item) => sum + (item.price * (item.quantity || 1)),
        0
    );

    return (
        <UserHomeLayout>
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">My Cart</h1>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-white p-4 rounded shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{item.title}</h2>
                                        <p className="text-gray-600">৳{item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange(idx, -1)}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity || 1}</span>
                                    <button
                                        onClick={() => handleQuantityChange(idx, 1)}
                                        className="px-2 bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemoveItem(idx)}
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="text-right mt-4 text-xl font-semibold">
                            Total: ৳{totalPrice}
                        </div>

                        <div className="bg-white p-4 rounded shadow mt-6">
                            <h2 className="text-xl font-bold mb-2">Checkout Information</h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={checkoutInfo.name}
                                onChange={handleInputChange}
                                className="block w-full p-2 border mb-2"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={checkoutInfo.phone}
                                onChange={handleInputChange}
                                className="block w-full p-2 border mb-2"
                            />
                            <textarea
                                name="address"
                                placeholder="Delivery Address"
                                value={checkoutInfo.address}
                                onChange={handleInputChange}
                                className="block w-full p-2 border mb-2"
                            />
                            <button
                                onClick={handlePlaceOrder}
                                disabled={cart.length === 0}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </UserHomeLayout>
    );
};

export default CartPage;
