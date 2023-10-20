import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, getProducts } from "../../store/products";
import { Link } from 'react-router-dom';
import "./index.css";

export const ProductIndex = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);

    useEffect(() =>{
        dispatch(fetchProducts());
    }, [])

    return(
    <>
    <h1 className="AllP">All HomemadEtsy Products</h1>
        <div className="products-container">
                {products.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <div key={product.id} className="product">
                            <div className="productPictureDiv">
                                <img src={product.photoUrl} alt="productPicture" />
                            </div>
                            <h2 className="productTitle">{product.title}</h2>
                            <p className="productCost">${product.price}</p>
                            <p className="productSeller">{product.user.username}</p>
                            <br/>
                        </div>
                    </Link>
                ))}
            </div>
    </>
    );
}

export default ProductIndex;