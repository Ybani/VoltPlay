import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowLeft, ShoppingCart, Heart, Package, Info, Star, MessageSquare, ThumbsUp } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../layout/MainLayout";
import SimilarProducts from "../common/SimilarProducts";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { user, token, isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:6969/api/products/${id}`);
            setProduct(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product);
    };

    // Load reviews from database
    useEffect(() => {
        if (product) {
            fetchReviews();
        }
    }, [product]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:6969/api/reviews/product/${id}`);
            setReviews(response.data.data || []);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert('Please log in to submit a review');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:6969/api/reviews',
                {
                    productId: product._id,
                    rating: newReview.rating,
                    comment: newReview.comment
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                // Refresh reviews list
                await fetchReviews();
                setNewReview({ rating: 5, comment: '' });
                setShowReviewForm(false);
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert('Failed to submit review. Please try again.');
            }
        }
    };

    const handleMarkHelpful = async (reviewId) => {
        try {
            await axios.post(`http://localhost:6969/api/reviews/${reviewId}/helpful`);
            // Refresh reviews to show updated count
            await fetchReviews();
        } catch (err) {
            console.error('Error marking review as helpful:', err);
        }
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const renderStars = (rating, interactive = false, onRate = null) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={interactive ? 24 : 16}
                className={`${index < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-600'
                    } ${interactive ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300' : ''} transition-colors`}
                onClick={() => interactive && onRate && onRate(index + 1)}
            />
        ));
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neon-blue"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !product) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-[#0a0b09] flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-neon-blue text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const isWishlisted = isInWishlist(product._id);

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Products
                    </motion.button>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="bg-[#1a1b23] rounded-2xl overflow-hidden p-8">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-[500px] object-contain"
                                />
                            </div>

                            {/* Stock Badge */}
                            {product.stock < 10 && product.stock > 0 && (
                                <div className="absolute top-8 right-8 bg-orange-500/90 text-white text-sm px-4 py-2 rounded-full font-semibold">
                                    Only {product.stock} left!
                                </div>
                            )}
                            {product.stock === 0 && (
                                <div className="absolute top-8 right-8 bg-red-500/90 text-white text-sm px-4 py-2 rounded-full font-semibold">
                                    Out of Stock
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            {/* Brand */}
                            <p className="text-neon-blue text-sm font-semibold mb-2 uppercase tracking-wider">
                                {product.brand}
                            </p>

                            {/* Product Name */}
                            <h1 className="text-4xl font-bold text-white mb-4">
                                {product.name}
                            </h1>

                            {/* Category */}
                            <div className="flex items-center gap-2 mb-6">
                                <Package size={16} className="text-gray-400" />
                                <span className="text-gray-400 capitalize">{product.category}</span>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-5xl font-bold bg-linear-to-r from-neon-blue via-electric-purple to-magenta bg-clip-text text-transparent">
                                    ${product.price}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <Info size={20} />
                                    Description
                                </h2>
                                <p className="text-gray-400 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specs */}
                            {product.specs && Object.keys(product.specs).length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-white mb-3">Specifications</h2>
                                    <div className="bg-[#1a1b23] rounded-lg p-4">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b border-gray-700 last:border-0">
                                                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-white font-medium">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="mb-8">
                                <label className="text-white font-semibold mb-3 block">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 bg-[#1a1b23] text-white rounded-lg hover:bg-[#25262f] transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-white text-2xl font-bold w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        disabled={quantity >= product.stock}
                                        className="w-12 h-12 bg-[#1a1b23] text-white rounded-lg hover:bg-[#25262f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${product.stock === 0
                                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                        : addedToCart
                                            ? "bg-green-600 text-white"
                                            : "bg-gradient-to-r from-neon-blue to-electric-purple text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                                        }`}
                                >
                                    <ShoppingCart size={24} />
                                    {product.stock === 0 ? "Out of Stock" : addedToCart ? "Added to Cart!" : "Add to Cart"}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleToggleWishlist}
                                    className={`p-4 rounded-lg transition-all ${isWishlisted
                                        ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                                        : "bg-[#1a1b23] text-gray-400 hover:bg-[#25262f] hover:text-red-500"
                                        }`}
                                >
                                    <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                                </motion.button>
                            </div>

                            {/* Stock Info */}
                            <div className="mt-6 text-sm text-gray-400">
                                {product.stock > 0 ? (
                                    <p>✓ {product.stock} units available</p>
                                ) : (
                                    <p>✗ Currently out of stock</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16"
                    >
                        <div className="bg-[#1a1b23] rounded-2xl p-8 border border-gray-800">
                            {/* Reviews Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                                        <MessageSquare size={28} className="text-neon-blue" />
                                        Customer Reviews
                                    </h2>
                                    {reviews.length > 0 && (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                                            </div>
                                            <span className="text-2xl font-bold text-white">{calculateAverageRating()}</span>
                                            <span className="text-gray-400">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowReviewForm(!showReviewForm)}
                                    className="px-6 py-3 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                                >
                                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                                </button>
                            </div>

                            {/* Review Form */}
                            {showReviewForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onSubmit={handleReviewSubmit}
                                    className="mb-8 p-6 bg-[#0a0b09] rounded-lg border border-gray-700"
                                >
                                    <h3 className="text-xl font-bold text-white mb-4">Share Your Experience</h3>

                                    <div className="mb-4">
                                        <label className="block text-white font-semibold mb-2">Your Rating</label>
                                        <div className="flex gap-1">
                                            {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-white font-semibold mb-2">Your Review</label>
                                        <textarea
                                            required
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            rows="4"
                                            className="w-full px-4 py-3 bg-[#1a1b23] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none resize-none"
                                            placeholder="Share your thoughts about this product..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                                    >
                                        Submit Review
                                    </button>
                                </motion.form>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg">No reviews yet. Be the first to review this product!</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <motion.div
                                            key={review._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-6 bg-[#0a0b09] rounded-lg border border-gray-700"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {renderStars(review.rating)}
                                                        <span className="text-yellow-400 font-bold">{review.rating}.0</span>
                                                    </div>
                                                    <h4 className="text-white font-bold">{review.userName}</h4>
                                                    <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed mb-3">{review.comment}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <button
                                                    onClick={() => handleMarkHelpful(review._id)}
                                                    className="flex items-center gap-1 text-gray-400 hover:text-neon-blue transition-colors"
                                                >
                                                    <ThumbsUp size={16} />
                                                    Helpful ({review.helpful})
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Similar Products Section */}
                    {product && (
                        <SimilarProducts currentProduct={product} limit={8} />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default ProductDetails;
