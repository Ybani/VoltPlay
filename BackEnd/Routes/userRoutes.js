import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers
} from '../Controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Search users
router.get('/search', searchUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

export default router;
