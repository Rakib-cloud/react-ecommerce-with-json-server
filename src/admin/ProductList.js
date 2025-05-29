import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products");

            setProducts(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            await axios.delete(`http://localhost:5000/products/${id}`);
            fetchProducts();
        }
    };

    const handleUpdateClick = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/products/${editingProduct.id}`,
                editingProduct
            );
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product List</h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td className="border px-4 py-2">{prod.id}</td>
                            <td className="border px-4 py-2">{prod.title}</td>
                            <td className="border px-4 py-2">${prod.price}</td>
                            <td className="border px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleUpdateClick(prod)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(prod.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Update Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
                            <h3 className="text-xl font-bold mb-4">Update Product</h3>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="mb-4">
                                    <label className="block font-semibold">Name</label>
                                    <input
                                        type="text"
                                        value={editingProduct.title}
                                        onChange={(e) =>
                                            setEditingProduct({...editingProduct, title: e.target.value})
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-semibold">Price</label>
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({...editingProduct, price: e.target.value})
                                        }
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>

    );
};

export default ProductList;
