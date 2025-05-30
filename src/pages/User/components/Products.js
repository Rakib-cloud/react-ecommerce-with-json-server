import React, { useEffect, useState } from "react";
import ProductCard from "../../../user/components/ProductCard";
import {baseUrl} from "../../../Helper/baseUrlHelper";
import {getData} from "../../../api/getApi";

const HomeProducts = () => {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch(`${baseUrl}/products`)
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data))
    //         .catch((err) => console.error("Failed to load products", err));
    // }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getData('/products');
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products');
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Available Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                {products.map((product,index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </>
    );
};

export default HomeProducts;
