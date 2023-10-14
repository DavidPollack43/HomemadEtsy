import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProducts } from "../../store/products";

export const ProductIndex = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);

    useEffect(() =>{
        dispatch(fetchProducts());
    }, [])

    return(
    <div className="products-container">
            {products.map(product => (
                <div key={product.id} className="product">
                    <h2>{product.title}</h2>
                    <p>Description: {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock Quantity: {product.stockQuantity}</p>
                    <p>Category: {product.category.name}</p>
                    <p>Seller: {product.user.username}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductIndex;