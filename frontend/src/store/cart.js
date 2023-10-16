import csrfFetch from "./csrf";

export const RECEIVE_CART = 'cart/RECEIVE_CART';

export const receiveCart = (payload) => {
    return {
        type: RECEIVE_CART,
        payload
    }
}

//Action to receiveCartItem (indvidual item)

//TODO

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
    console.log("About to csrfFetch")
    const res = await csrfFetch("/api/cart_items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product_id: productId, quantity: quantity})
    })
    console.log(res)
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

//Change reducer accordingly

//TODO
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
