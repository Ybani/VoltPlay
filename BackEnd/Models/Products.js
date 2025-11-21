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
        type: number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    specs : {
        type: Object,
        default: {}
    }
},
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

