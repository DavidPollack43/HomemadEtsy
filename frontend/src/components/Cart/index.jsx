import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from "../../store/cart";

export const Cart = (props) => {
    const cart = useSelector(getCartItems);
    console.log(cart)
    return(
        <>
            {cart.map(item => (
                <div key={item.id} className="cartItem">
                    <h2>{item.product.title}</h2>
                    <p>{item.product.username}</p>
                    <p>{item.product.description}</p>
                    <p>{item.product.price}</p>
                    <p>{item.quantity}</p>
                </div>
            ))}
        </>
    )
}

export default Cart