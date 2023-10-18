import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProducts } from "../../store/products";
import { Link } from 'react-router-dom';
import "./index.css";

export const ProductIndex = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);
    console.log("Products: ", products)

    useEffect(() =>{
        dispatch(fetchProducts());
    }, [])

    return(
    <div className="products-container">
            {products.map(product => (
                <div key={product.id} className="product">
                    <div className="productPictureDiv">
                        <img src={product.photoUrl} alt="productPicture" />
                    </div>
                    <h2 className="productTitle">{product.title}</h2>
                    <p className="productCost">${product.price}</p>
                    <br/>
                    <Link to={`/products/${product.id}`}>Product Show</Link>
                </div>
            ))}
        </div>
    );
}

export default ProductIndex;