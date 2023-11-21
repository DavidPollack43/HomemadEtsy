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