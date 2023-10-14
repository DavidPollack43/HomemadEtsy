import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, getProduct } from '../../store/products';

export const ProductShow = () =>{
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(getProduct(productId));
    console.log(product)

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [productId])

    return (
        <>
            <h1>{product.title}</h1>
        </>
    )
}

export default ProductShow;