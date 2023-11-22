import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';
import "./ReviewForm.css"

const ReviewForm = ({productId}) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            review: {
                rating: parseInt(rating, 10),
                content: content
            }
        };
        dispatch(createReview(productId, review))
        setRating('');
        setContent('');
    }
    return (
        <>
        <form onSubmit={handleSubmit} className='form-create'>
            <label className='rating-create'>
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
            <label className='review-create'>
                Review:
                <textarea className='text-area-create' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </label>
            <button className='create-button' type='submit'>Submit Review</button>
        </form>
        </>
    )
}

export default ReviewForm