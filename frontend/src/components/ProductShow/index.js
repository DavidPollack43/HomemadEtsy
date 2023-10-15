import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProducts, getProduct, getProducts } from '../../store/products';

export const ProductShow = () =>{
    const dispatch = useDispatch();
    const {productId} = useParams();
    console.log("Product ID is: ", productId)
    const product = useSelector(getProduct(productId));
    const products = useSelector(getProducts);
    console.log("This is the product: ", product)

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [productId])

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    console.log ("Products: ", products)



    return (
        <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stockQuantity}</p>
        </>
    )
}

export default ProductShow;