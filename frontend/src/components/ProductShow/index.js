import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, getProduct } from '../../store/products';
import { addToCart, getCartItemByProductId, updateToCart } from '../../store/cart';
import { useState } from 'react';
import "./index.css"
import purpleIcon from './purpleIcon.svg'
import checkMark from './checkMarkBlue.svg'
import star from './icons8-star-48.png'
import ReviewForm from '../ReviewForm/ReviewForm';
import UpdateReviewForm from '../UpdateReviewForm/UpdateReviewForm';
import { deleteReview } from '../../store/review';

export const ProductShow = () =>{
    const dispatch = useDispatch();
    const {productId} = useParams();
    // const product = useSelector(getProduct(productId));
    const reduxProduct = useSelector(getProduct(productId));
    const [product, setProduct] = useState(reduxProduct);
    const [quantityForCart, setQuantityForCart] = useState(1)
    const existingCartItem = useSelector(state => getCartItemByProductId(state, productId));
    const [addedToCart, setAddedToCart] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProduct(productId));
        }
    }, [productId, dispatch]);

    useEffect(() => {
        setProduct(reduxProduct);
    }, [reduxProduct]);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [])

    // useEffect(() => {
    //     if (productId) {
    //         dispatch(fetchProduct(productId));
    //     }
    // }, [productId, dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        if(!sessionUser){

        }

        if (existingCartItem){
            const newQuantity = quantityForCart
            dispatch(updateToCart(existingCartItem.id, newQuantity))
        }else{
            dispatch(addToCart(productId, quantityForCart))
        }
        setAddedToCart(true);
    }

    const setQuantity = (e) => {
        e.preventDefault();
        setQuantityForCart(e.target.value)
    }

    const handleDelete = (review) => {
        console.log("Delete button pressed")
        dispatch(deleteReview(review.productId, review.id));
        const updatedReviews = product.reviews.filter(r => r.id !== review.id);
        setProduct({ ...product, reviews: updatedReviews });
    }

    console.log("product: ", product);

    return (product) ? 
    (
        <>
            {/* <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.stockQuantity}</p> */}
            <div className="productPictureDivShow">
                <img src={product.photoUrl} alt="productPicture" className="productImage"/>
            </div>
            <br/>

            <p className='demand'>In demand. Buy now while supplies last! Only {product.stockQuantity} left!</p>
            <p className='price'>${product.price}0</p>
            <p className='title'>{product.title}</p>
            <div className='sellerDiv'>
                <p className='seller'>{product.user.username}</p>
                <img src={purpleIcon} className='purple' alt="icon" />
            </div>
            <div className='review-div-show'>
                <img src={star} className='star-show'/>
                <p>{product.averageRating}</p>
            </div>
            <img src={checkMark} alt="checkMark" className='checkMark' />
            <p className='returns'>Returns & exchanges accepted</p>
            <p className='description'>{product.description}</p>
            <p className='quantity'>Quantity</p>
            
            <select value={quantityForCart} onChange={setQuantity} className='select'>
                {[...Array(product.stockQuantity)].map((_, idx) => (
                    <option key={idx} value={idx+1}>{idx + 1}</option> // Added return here.
                 ))}
            </select>
            {sessionUser ? (
            <button onClick={handleClick} className='addToCart'>Add to Cart</button>
            ) : (
               <button className='pleaseLogin'>Please login to add to cart</button>
            )} 
            {addedToCart ? <p className='addedToCartWords'>Successfully added to cart!</p> : null}
            <div className='full-review-div'>
                <h2 className='review-count'>Reviews: </h2>
                <div className='all-review-div'>
                    {product.reviews.map(review => {
                        return(
                            <div className='single-review-div'>
                                <div className='review-star-rating-div'>
                                    <img src={star} className='star-review'/>
                                    <p className='single-review-rating'>{review.rating}</p>
                                </div>
                                {editingReviewId === review.id ? (
                                    <UpdateReviewForm productId={productId} review={review} onCancel={() => setEditingReviewId(null)} />
                                ) : (
                                <div>
                                    <p>{review.content}</p>
                                    <p className='review-user'>By: {review.user.username}</p>
                                    {sessionUser && sessionUser.id === review.user.id && (
                                            <button className='trigger-update-button' onClick={() => setEditingReviewId(review.id)}>Update</button>
                                    )}
                                    {sessionUser && sessionUser.id === review.user.id && (
                                        <button className='trigger-delete-button' onClick={() => handleDelete(review)}>Delete Review</button>
                                    )}
                                </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {sessionUser && (
                    <button onClick={() => setShowReviewForm(!showReviewForm)} className='create-review-button'>
                        Create a Review
                    </button>
                )}
            {showReviewForm && (
                <div id='review-form'>
                    <ReviewForm productId={productId}/>
                </div>
            )}
            </div>
        </>
    ) : (
        null
    )
}

export default ProductShow;