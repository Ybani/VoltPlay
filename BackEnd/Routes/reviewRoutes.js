import express from 'express';
import {
    createReview,
    getProductReviews,
    getUserReviews,
    updateReview,
    deleteReview,
    markHelpful
} from '../Controllers/reviewController.js';
import { protect } from '../Middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);
router.post('/:id/helpful', markHelpful);

// Protected routes (require authentication)
router.post('/', protect, createReview);
router.get('/user', protect, getUserReviews);
router.get('/user/:userId', protect, getUserReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
