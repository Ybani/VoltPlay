import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: "",
        trim: true
    },
    phone: {
        type: String,
        default: "",
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, default: 1 } }
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    productsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
},
    { timestamps: true }
);

// generetae the token 
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        firstName: this.firstName,
        lastName: this.lastName
    }, process.env.TOKEN_SECRET, { expiresIn: '4h' });
}


const User = mongoose.model('User', userSchema);
//validation user input
function validateUser(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(20).required(),
        lastName: Joi.string().trim().min(3).max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
        phone: Joi.string().pattern(/^[0-9]{8}$/).allow(""),
        address: Joi.string().max(100).allow("")

    });
    return schema.validate(obj);
}

//validate user login
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
}




export { User, validateUser, validateLoginUser, };