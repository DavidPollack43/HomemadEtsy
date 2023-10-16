import csrfFetch from "./csrf";

export const RECEIVE_CART = 'cart/RECEIVE_CART';

export const receiveCart = (payload) => {
    return {
        type: RECEIVE_CART,
        payload
    }
}

export const getCartItems = (state) => state.cart ? Object.values(state.cart) : [];

export const getCartItem = (state) => (itemId) => state.cart ? state.cart[itemId] : null;