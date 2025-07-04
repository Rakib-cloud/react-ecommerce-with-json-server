import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        image: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response= await axios.post("http://localhost:5000/products", product);
           console.log('response',response)
            if(response?.status==201){
                alert(`${response?.data?.title} product added successfully!`);
                setProduct({ title: "", price: "", description: "", image: "" });
            }else {
                alert(response?.statusText);
            }


        } catch (err) {
            alert("Error adding product!");
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={product.title}
                    onChange={handleChange}
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full border p-2"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                    className="w-full border p-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </form>
        </AdminLayout>
    );
};

export default AddProduct;
