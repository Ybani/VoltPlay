import mongoose from 'mongoose';
import Joi from 'joi';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['mice', 'keyboards', 'consoles', 'monitors', 'audio'],
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    specs: {
        type: Object,
        default: {}
    }
},
    { timestamps: true }
);


const Product = mongoose.model('Product', productSchema);

// Validation function
function validateProduct(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().min(10).max(500).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().valid('mice', 'keyboards', 'consoles', 'monitors', 'audio').required(),
        brand: Joi.string().trim().min(2).max(50).required(),
        imageUrl: Joi.string().trim().uri().required(),
        stock: Joi.number().min(0).allow(null),
        specs: Joi.object().allow(null)
    });
    return schema.validate(obj);
}

export { Product, validateProduct };
