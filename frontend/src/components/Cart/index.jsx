import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCart, getCartItems, updateToCart } from "../../store/cart";
import { useState } from 'react';
import { useEffect } from "react";
import "./index.css"

export const Cart = (props) => {
    const dispatch = useDispatch();
    const [quantityForCart, setQuantityForCart] = useState({}) //Need to make item.quantity default, but item is defined in my map
    const cart = useSelector(getCartItems);

    useEffect(() =>{
        const initialQuantities = {};
        cart.forEach(item => {
            initialQuantities[item.id] = item.quantity;
        });
        setQuantityForCart(initialQuantities)
    },[cart])

    useEffect(() => {
        dispatch(fetchCart())
    }, [])


    const setQuantity = (e, itemId) => {
        e.preventDefault();
        const newQuantity = parseInt(e.target.value);

        setQuantityForCart({
            ...quantityForCart,
            [itemId]: parseInt(e.target.value)
        });

        dispatch(updateToCart(itemId, newQuantity));
    }

    const handleClick = (itemId) => (e) => {
        e.preventDefault();
        dispatch(deleteCartItem(itemId));
    }

    const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    return (cart.length > 0) ? 
    (
        <>
        <h1>{cart.length} items in your cart</h1>
            <div className="CartItemsDiv">           
                {cart.map(item => (
                    <div key={item.id} className="cartItem">
                        <h2>{item.product.title}</h2>
                        <div className="productPictureDivCart">
                            <img src={item.product.photoUrl} alt="productPicture" className="productImageCart"/>
                        </div>
                        <p>{item.product.username}</p>
                        <p>{item.product.description}</p>
                        <p>{item.product.price}</p>
                        <p>{item.quantity}</p>
                        <p>Total Price of Item: {item.product.price * item.quantity}</p>
                        <select value={quantityForCart[item.id] || ""} onChange={(e) => setQuantity(e, item.id)}>
                            {[...Array(item.product.stockQuantity)].map((_, idx) => (
                                <option key={idx} value={idx+1}>{idx + 1}</option> // Added return here.
                            ))}
                        </select>
                        <br/>
                        <button className="DeleteButton" onClick={handleClick(item.id)}>Remove from Cart</button>
                    </div>
                ))}
            </div>
            <br/>
            <h2>Total Order Price = {totalPrice}</h2>
        </>
    ) : (
        null
    )
}

export default Cart