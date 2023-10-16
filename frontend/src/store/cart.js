import csrfFetch from "./csrf";

export const RECEIVE_CART = 'cart/RECEIVE_CART';
export const RECEIVE_CART_ITEM = "cart/RECEIVE_CART_ITEM"
export const REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM"

export const receiveCart = (payload) => {
    return {
        type: RECEIVE_CART,
        payload
    }
}

export const receiveCartItem = (payload) => {
    return {
        type: RECEIVE_CART_ITEM,
        payload
    }
}

export const removeCartItem = (payload) => {
    return {
        type: REMOVE_CART_ITEM,
        payload
    }
}

export const getCartItems = (state) => state.cart ? Object.values(state.cart) : [];

export const getCartItem = (state) => (itemId) => state.cart ? state.cart[itemId] : null;

export const getCartItemByProductId = (state, productId) => {
    return Object.values(state.cart).find(item => item.product.productId === parseInt(productId));
}

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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id: productId, quantity: quantity})
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCartItem(data));
        return true;
    }else{
        const errorMessage = await res.json();
        console.error("Failed to add to cart", errorMessage.message || "Unknown Error");
        return false;
    }
}

export const updateToCart = (cartItemId, quantity) => async(dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cartItemId: cartItemId, quantity: quantity})
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveCartItem(data));
        return true;
    }else{
        const errorMessage = await res.json();
        console.error("Failed to update cart", errorMessage.message || "Unknown Error");
        return false;
    }
}

export const deleteCartItem = (cartItemId) => async(dispatch) => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok){
        dispatch(removeCartItem(cartItemId));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to delete cart item", errorMessage.message || "Unknown Error");
    }
}

//Change reducer accordingly

//TODO
export const cartReducer = (state = {}, action) => {
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CART:
            return{...state, ...action.payload}
        case RECEIVE_CART_ITEM:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_CART_ITEM:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
}

export default cartReducer;
