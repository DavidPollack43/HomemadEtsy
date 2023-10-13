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
    const res = await fetch("/api/products");
    if(res.ok){
        const data = await res.json();
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
            return {...state, ...action.products}
        case RECEIVE_PRODUCT:
            nextState[action.product.id] = action.product;
            return nextState;
        default:
            return state;
    }
}

export default productReducer;