import React, { useEffect, useState } from "react";
import ProductCard from "../../../user/components/ProductCard";

const HomeProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to load products", err));
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">Available Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
};

export default HomeProducts;
