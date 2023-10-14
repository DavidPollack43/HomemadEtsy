import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, getProduct, receiveProduct } from "../../store/products";

export const ProductIndexItem = ({product}) => {

    const dispatch = useDispatch();
    const product = useSelector(getProduct(product.id))

    useEffect(() => {
        dispatch(fetchProduct(product.id))
    }, [])
    return(
        <>
            
        </>
    )
}

export default ProductIndexItem