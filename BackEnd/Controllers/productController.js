import asyncHandler from "express-async-handler";
import { Product, validateProduct } from "../Models/Products.js";

/**
 * @desc    Get all products (with optional category filter)
 * @route   GET /api/products?category=mice
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json({
        success: true,
        data: product
    });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json({
        success: true,
        data: product
    });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});
