import { Review, validateReview } from '../Models/Review.js';
import { Product } from '../Models/Products.js';
import { User } from '../Models/User.js';

// Create a new review
export const createReview = async (req, res) => {
    try {
        // Validate review data
        const { error } = validateReview(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { productId, rating, comment } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Get user info from authenticated user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            productId,
            userId: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product. Please update your existing review instead.'
            });
        }

        // Create new review
        const review = new Review({
            productId,
            userId: req.user._id,
            userName: `${user.firstName} ${user.lastName}`,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: review
        });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create review'
        });
    }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        console.error('Error fetching product reviews:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};

// Get all reviews by a user
export const getUserReviews = async (req, res) => {
    try {
        const userId = req.params.userId || req.user._id;

        // Ensure user can only see their own reviews unless they're admin
        if (userId !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const reviews = await Review.find({ userId })
            .populate('productId', 'name imageUrl category price')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        console.error('Error fetching user reviews:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Find the review
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if user owns this review
        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own reviews'
            });
        }

        // Update review
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update review'
        });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the review
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if user owns this review or is admin
        if (review.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own reviews'
            });
        }

        await Review.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete review'
        });
    }
};

// Mark review as helpful
export const markHelpful = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndUpdate(
            id,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Marked as helpful',
            data: review
        });
    } catch (err) {
        console.error('Error marking review as helpful:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to mark review as helpful'
        });
    }
};
