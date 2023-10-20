import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getProductsCategory } from "../../store/products";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const ProductCategory = () => {
    // debugger
    const dispatch = useDispatch();
    const {categoryId} = useParams();
    const state = useSelector((state) => state);
    console.log("State", state)
    const products = useSelector(getProductsCategory(categoryId));

    useEffect(() =>{
        dispatch(fetchProducts());
    }, [])

    return (products) ? (
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
    ) : (
        null
    )
}

export default ProductCategory