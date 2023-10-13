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