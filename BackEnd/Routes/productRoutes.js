import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../Controllers/productController.js';
import { protect, admin } from '../Middleware/adminAuth.js';

const router = express.Router();

// Get all products (with optional category filter)
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create new product (Admin only)
router.post('/', protect, admin, createProduct);

// Update product (Admin only)
router.put('/:id', protect, admin, updateProduct);

// Delete product (Admin only)
router.delete('/:id', protect, admin, deleteProduct);

export default router;
