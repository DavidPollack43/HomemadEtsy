import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';

const ReviewForm = ({productId}) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = { rating, content};
        dispatch(createReview(productId, review))
        setRating('');
        setContent('');
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <input
                    type='number'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                    />
            </label>
            <label>
                Review:
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </label>
            <button type='submit'>Submit Review</button>
        </form>
        </>
    )
}

export default ReviewForm