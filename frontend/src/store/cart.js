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

export const fetchCart = () => async (dispatch) => {
    const res = await fetch("/api/cart_items");
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCart(data));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to fetch cart", errorMessage.message || "Unknown Error")
    }
}

export const addToCart = (productId, quantity) => async(dispatch) => {
    const res = await csrfFetch("/api/cart_items", {
        method: "POST",
        headers: {
            "Content_Type": "application/json"
        },
        body: JSON.stringify({product_id: productId, quantity: quantity})
    })

    if(res.ok){
        const data = await res.json();
        dispatch(receiveCart(data));
        return true;
    }else{
        const errorMessage = await res.json();
        console.error("Failed to add to cart", errorMessage.message || "Unknown Error");
        return false;
    }
}

export const cartReducer = (state = {}, action) => {
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CART:
            return{...state, ...action.payload}
        default:
            return state;
    }
}

export default cartReducer;
