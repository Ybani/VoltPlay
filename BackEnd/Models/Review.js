import mongoose from 'mongoose';
import Joi from 'joi';

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    helpful: {
        type: Number,
        default: 0,
        min: 0
    }
},
    { timestamps: true }
);

// Index for efficient queries
reviewSchema.index({ productId: 1, createdAt: -1 });
reviewSchema.index({ userId: 1, createdAt: -1 });

const Review = mongoose.model('Review', reviewSchema);

// Validation function
function validateReview(obj) {
    const schema = Joi.object({
        productId: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().trim().min(10).max(1000).required()
    });
    return schema.validate(obj);
}

export { Review, validateReview };
