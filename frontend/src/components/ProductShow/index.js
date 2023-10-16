import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, getProduct } from '../../store/products';
import { addToCart } from '../../store/cart';
import { useState } from 'react';

export const ProductShow = () =>{
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(getProduct(productId));
    const [quantityForCart, setQuantityForCart] = useState(1)

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [productId])

    const handleClick = (e) => {
        console.log("About to handle click!")
        console.log("Product = ", product)
        console.log("Quantity = ", quantityForCart)
        e.preventDefault();
        dispatch(addToCart(productId, quantityForCart))
    }

    const setQuantity = (e) => {
        e.preventDefault();
        setQuantityForCart(e.target.value)
    }

    return (
        <>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stockQuantity}</p>
            <br/>
            <select value={quantityForCart} onChange={setQuantity}>
                {[...Array(product.stockQuantity)].map((_, idx) => (
                    <option key={idx} value={idx+1}>{idx + 1}</option> // Added return here.
                 ))}
            </select>
            <br/>
            <button onClick={handleClick}>Add to Cart</button>
        </>
    )
}

export default ProductShow;