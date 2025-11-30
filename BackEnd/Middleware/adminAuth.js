import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../Models/User.js';

/**
 * @desc    Protect routes - verify JWT token
 * @access  Private
 */
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const secret = process.env.JWT_SECRET || process.env.TOKEN_SECRET;
            const decoded = jwt.verify(token, secret);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

/**
 * @desc    Admin middleware - verify user is admin
 * @access  Private/Admin
 */
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
};
