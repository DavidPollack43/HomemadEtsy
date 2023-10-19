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
                        <div className="sellerCartDiv">
                            <h2 className="sellerCart">{item.product.username}</h2>
                        </div>
                        <div className="productPicTitleDiv">
                            <div className="productPictureDivCart">
                                <img src={item.product.photoUrl} alt="productPicture" className="productImageCart"/>
                            </div>
                            <div className="titleDescriptionDiv">
                                 <p className="productCartTitle">{item.product.title}</p>
                                 <div className="descriptionQuantity">
                                    <p className="prodcutCartDescription">{item.product.description}</p>
                                    <div className="quantityOptionsDiv">
                                        <p className="quantityCart">Quantity</p>
                                        <select value={quantityForCart[item.id] || ""} onChange={(e) => setQuantity(e, item.id)} className="selectionCart">
                                            {[...Array(item.product.stockQuantity)].map((_, idx) => (
                                                <option key={idx} value={idx+1}>{idx + 1}</option> // Added return here.
                                            ))}
                                        </select>
                                    </div>
                                 </div>
                            </div>
                        </div>
                        <p>{item.product.username}</p>
                        <p>{item.product.price}</p>
                        <p>{item.quantity}</p>
                        <p>Total Price of Item: {item.product.price * item.quantity}</p>
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