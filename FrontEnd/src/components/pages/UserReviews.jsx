import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Star, Trash2, Edit2, Package, Calendar, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../layout/MainLayout";

function UserReviews() {
    const navigate = useNavigate();
    const { user, token, isAuthenticated } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [editForm, setEditForm] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }
        fetchUserReviews();
    }, [isAuthenticated]);

    const fetchUserReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:6969/api/reviews/user/${user._id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setReviews(response.data.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching user reviews:", err);
            setError("Failed to load your reviews");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:6969/api/reviews/${reviewId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // Refresh reviews list
            await fetchUserReviews();
        } catch (err) {
            console.error('Error deleting review:', err);
            alert('Failed to delete review. Please try again.');
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review._id);
        setEditForm({
            rating: review.rating,
            comment: review.comment
        });
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
        setEditForm({ rating: 5, comment: '' });
    };

    const handleUpdateReview = async (reviewId) => {
        try {
            await axios.put(
                `http://localhost:6969/api/reviews/${reviewId}`,
                editForm,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // Refresh reviews and reset edit state
            await fetchUserReviews();
            setEditingReview(null);
            setEditForm({ rating: 5, comment: '' });
        } catch (err) {
            console.error('Error updating review:', err);
            alert('Failed to update review. Please try again.');
        }
    };

    const renderStars = (rating, interactive = false, onRate = null) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={interactive ? 24 : 20}
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

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#0a0b09] pt-6 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <MessageSquare size={36} className="text-neon-blue" />
                            My Reviews
                        </h1>
                        <p className="text-gray-400">Manage all your product reviews</p>
                    </motion.div>

                    {/* Reviews List */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {reviews.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <MessageSquare size={64} className="mx-auto text-gray-600 mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">No Reviews Yet</h2>
                            <p className="text-gray-400 mb-6">You haven't written any product reviews yet.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                            >
                                Browse Products
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <motion.div
                                    key={review._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#1a1b23] rounded-2xl overflow-hidden border border-gray-800"
                                >
                                    <div className="p-6">
                                        {/* Product Info */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <img
                                                src={review.productId?.imageUrl || '/placeholder.png'}
                                                alt={review.productId?.name || 'Product'}
                                                className="w-24 h-24 object-contain bg-[#0a0b09] rounded-lg p-2 cursor-pointer hover:opacity-80 transition"
                                                onClick={() => navigate(`/product/${review.productId?._id}`)}
                                            />
                                            <div className="flex-1">
                                                <h3
                                                    className="text-xl font-bold text-white mb-1 cursor-pointer hover:text-neon-blue transition"
                                                    onClick={() => navigate(`/product/${review.productId?._id}`)}
                                                >
                                                    {review.productId?.name || 'Unknown Product'}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Package size={14} />
                                                        {review.productId?.category || 'N/A'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
                                                    ${review.productId?.price || 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Review Content */}
                                        {editingReview === review._id ? (
                                            // Edit Form
                                            <div className="bg-[#0a0b09] rounded-lg p-4 border border-gray-700">
                                                <h4 className="text-white font-bold mb-3">Edit Your Review</h4>
                                                <div className="mb-4">
                                                    <label className="block text-white font-semibold mb-2">Rating</label>
                                                    <div className="flex gap-1">
                                                        {renderStars(editForm.rating, true, (rating) => setEditForm({ ...editForm, rating }))}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-white font-semibold mb-2">Comment</label>
                                                    <textarea
                                                        value={editForm.comment}
                                                        onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                                        rows="4"
                                                        className="w-full px-4 py-3 bg-[#1a1b23] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:outline-none resize-none"
                                                        placeholder="Update your review..."
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleUpdateReview(review._id)}
                                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-blue to-electric-purple text-white rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                                                    >
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Display Review
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    {renderStars(review.rating)}
                                                    <span className="text-yellow-400 font-bold">{review.rating}.0</span>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed mb-4">{review.comment}</p>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(review)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#0a0b09] text-neon-blue rounded-lg hover:bg-[#14151b] transition font-semibold"
                                                    >
                                                        <Edit2 size={16} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(review._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition font-semibold"
                                                    >
                                                        <Trash2 size={16} />
                                                        Delete
                                                    </button>
                                                    {review.helpful > 0 && (
                                                        <div className="ml-auto text-gray-400 text-sm">
                                                            {review.helpful} {review.helpful === 1 ? 'person' : 'people'} found this helpful
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default UserReviews;
