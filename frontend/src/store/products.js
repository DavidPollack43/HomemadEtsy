import csrfFetch from "./csrf";

export const RECEIVE_PRODUCTS = 'products/RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT = 'products/RECEIVE_PRODUCT';

export const receiveProducts = (payload) => {
    return {
        type: RECEIVE_PRODUCTS,
        payload
    }
}

export const receiveProduct = (payload) => {
    return {
        type: RECEIVE_PRODUCT,
        payload
    }
}

export const getProducts = (state) => state.products ? Object.values(state.products) : [];

export const getProduct = (productId) => (state) => state.products ? state.products[productId] : null;

export const fetchProducts = () => async (dispatch) => {
    console.log("About to do res")
    const res = await fetch("/api/products");
    console.log("Did res")
    if(res.ok){
        const data = await res.json();
        console.log(data)
        dispatch(receiveProducts(data));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to fetch products", errorMessage.message || "Unknown error")
    }
}

export const fetchProduct = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`);
    if(res.ok){
        const data = await res.json();
        dispatch(receiveProduct(data));
    }else{
        const errorMessage = await res.json();
        console.error("Failed to fetch product", errorMessage.message || "Unknown error");
    }
}

export const productReducer = (state = {}, action) => {
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_PRODUCTS:
            console.log("In reducer, going to receive Products")
            console.log(action)
            return {...state, ...action.payload}
        case RECEIVE_PRODUCT:
            nextState[action.payload.id] = action.payload;
            return nextState;
        default:
            return state;
    }
}

export default productReducer;