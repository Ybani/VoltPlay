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
        trim: true
    },
    specs : {
        type: Object,
        default: {}
    },
     productPictures: [
        {
            url: { type: String, required: true },
            public_id: { type: String, default: null }
        }
    ]
},
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
// validation function
function validateProduct(obj){
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        description: Joi.string().trim().min(10).max(500).required(),
        price: Joi.number().positive().required(),
        category: Joi.string().trim().min(3).max(30).required(),
        specs: Joi.object().optional(),
        productPictures: Joi.array().items(Joi.object({
            url: Joi.string().uri().required(),
            public_id: Joi.string().allow(null)
        })).optional()
    })
    return schema.validate(obj);
}
// validate update product
function validateUpdateProduct(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(50),
        description: Joi.string().trim().min(10).max(500),
        price: Joi.number().positive(),
        category: Joi.string().trim().min(3).max(30),
        specs: Joi.object(),
        productPictures: Joi.array().items(Joi.object({
            url: Joi.string().uri().required(),
            public_id: Joi.string().allow(null)
        }))
    });
    return schema.validate(obj);
}



export { Product, validateProduct, validateUpdateProduct };