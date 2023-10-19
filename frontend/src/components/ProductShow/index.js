import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, getProduct } from '../../store/products';
import { addToCart, getCartItemByProductId, updateToCart } from '../../store/cart';
import { useState } from 'react';
import "./index.css"
import purpleIcon from './purpleIcon.svg'
import checkMark from './checkMarkBlue.svg'

export const ProductShow = () =>{
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(getProduct(productId));
    const [quantityForCart, setQuantityForCart] = useState(1)
    const existingCartItem = useSelector(state => getCartItemByProductId(state, productId));
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [productId])

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [])

    const handleClick = (e) => {
        e.preventDefault();

        if (existingCartItem){
            const newQuantity = quantityForCart
            dispatch(updateToCart(existingCartItem.id, newQuantity))
        }else{
            dispatch(addToCart(productId, quantityForCart))
        }
        setAddedToCart(true);
    }

    const setQuantity = (e) => {
        e.preventDefault();
        setQuantityForCart(e.target.value)
    }

    return (product) ? 
    (
        <>
            {/* <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.stockQuantity}</p> */}
            <div className="productPictureDivShow">
                <img src={product.photoUrl} alt="productPicture" className="productImage"/>
            </div>
            <br/>

            <p className='demand'>In demand. Buy now while supplies last! Only {product.stockQuantity} left!</p>
            <p className='price'>${product.price}</p>
            <p className='title'>{product.title}</p>
            <div className='sellerDiv'>
                <p className='seller'>{product.user.username}</p>
                <img src={purpleIcon} className='purple' alt="icon" />
            </div>
            <img src={checkMark} alt="checkMark" className='checkMark' />
            <p className='returns'>Returns & exchanges accepted</p>
            <p className='description'>{product.description}</p>
            <p className='quantity'>Quantity</p>
            
            <select value={quantityForCart} onChange={setQuantity} className='select'>
                {[...Array(product.stockQuantity)].map((_, idx) => (
                    <option key={idx} value={idx+1}>{idx + 1}</option> // Added return here.
                 ))}
            </select>
            <button onClick={handleClick} className='addToCart'>Add to Cart</button>
            {addedToCart ? <p className='addedToCartWords'>Successfully added to cart!</p> : null};
        </>
    ) : (
        null
    )
}

export default ProductShow;