import React from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../store/review";
import { useState } from "react";

const UpdateReviewForm = ({productId,review, onCancel}) => {
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReview = {
            review: {
                rating: parseInt(rating, 10),
                content: content
            }
        };
        dispatch(updateReview(productId,review.id, updatedReview)) //Need to add productId as argument
        onCancel();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </label>
                <label>
                    Review:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </>
    )
}

export default UpdateReviewForm;