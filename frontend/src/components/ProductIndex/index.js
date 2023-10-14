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
        <>
            <h1>Hello from Product Index!</h1>
        </>
    )
}

export default ProductIndex;