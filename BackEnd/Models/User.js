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
    }
},
    { timestamps: true }
);





const User = mongoose.model('User', userSchema);
//validation function
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


export { User, validateUser };