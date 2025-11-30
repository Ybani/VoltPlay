import { User } from '../Models/User.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public (should be Private/Admin in production)
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Public (should be Private in production)
 */
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private
 */
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,              // Return updated document
            runValidators: true     // Run schema validators
        }
    ).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
});

/**
 * @desc    Search users by name or email
 * @route   GET /api/users/search?q=searchterm
 * @access  Public
 */
export const searchUsers = asyncHandler(async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        res.status(400);
        throw new Error('Search term is required');
    }

    const users = await User.find({
        $or: [
            { firstName: { $regex: searchTerm, $options: 'i' } },
            { lastName: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } }
        ]
    }).select('-password');

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});
