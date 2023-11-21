import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE-REVIEW';

export const receiveReviews = (payload) => {
    return {
        type: RECEIVE_REVIEWS,
        payload
    }
}

export const receiveReview = (payload) => {
    return{
        type: RECEIVE_REVIEW,
        payload
    }
}

export const removeReview = (reviewId) => {
    return{
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const getReviews = (state) => state.reviews ? Object.values(state.reviews) : [];

export const getReview = (reviewId) => (state) => state.reviews ? state.reviews[reviewId] : null;

export const fetchReviews = (productId) => async(dispatch) => {
    const res = await fetch(`api/products/${productId}/reviews`);
    if(res.ok){
        const data = await res.json();
        dispatch(receiveReviews(data));
    } else {
        const errorMessage = await res.json();
        console.error("Failed to fetch reviews", errorMessage.message || "Unkown error");
    }
}

export const fetchReview = (productId, reviewId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`);
    if(res.ok){
        const data = await res.json();
        dispatch(receiveReview(data));
    } else{
        const errorMessage = await res.json();
        console.error("Failed to fetch review", errorMessage.message || "Unkown error");
    }
}

export const createReview = (productId, review) => async(dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/reviews`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveReview(data));
    } else {
        const error = await res.json();
        console.error("Error creating review: ", error.message);
    }
}

export const updateReview = (productId, reviewId, review) => async(dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(receiveReview(data))
    } else {
        const error = await res.json();
        console.error("Error updating review: ", error.message);
    }
}

export const deleteReview = (productId, reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok){
        dispatch(removeReview(reviewId));
    } else{
        const error = await res.json();
        console.error("Error deleting review: ", error.message);
    }
}