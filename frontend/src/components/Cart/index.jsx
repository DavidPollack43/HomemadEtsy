import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, updateToCart } from "../../store/cart";
import { useState } from 'react';
import { useEffect } from "react";

export const Cart = (props) => {
    const dispatch = useDispatch();
    const [quantityForCart, setQuantityForCart] = useState({}) //Need to make item.quantity default, but item is defined in my map
    const cart = useSelector(getCartItems);
    console.log(cart)

    useEffect(() =>{
        const initialQuantities = {};
        cart.forEach(item => {
            initialQuantities[item.id] = item.quantity;
        });
        setQuantityForCart(initialQuantities)
    },[cart])


    const setQuantity = (e, itemId) => {
        e.preventDefault();
        const newQuantity = parseInt(e.target.value);

        setQuantityForCart({
            ...quantityForCart,
            [itemId]: parseInt(e.target.value)
        });

        dispatch(updateToCart(itemId, newQuantity));
    }

    const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return(
        <>
            {cart.map(item => (
                <div key={item.id} className="cartItem">
                    <h2>{item.product.title}</h2>
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
                </div>
            ))}
            <h2>Total Price = {totalPrice}</h2>
        </>
    )
}

export default Cart