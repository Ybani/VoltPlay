import asyncHandler from 'express-async-handler';
import { Product, validateProduct, validateUpdateProduct } from '../Models/Products.js';

/*---------------------
@desc Create a new Product
@route POST /api/products
@access private
---------------------*/

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        specs: req.body.specs,
        productPictures: req.body.productPictures
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
});


/*---------------------
@desc Get all Products
@route GET /api/products
@access Public
---------------------*/

export const getProductsCtrl = asyncHandler(async (req, res) => {
    const { category } = req.query;
    const query = {};
    if (category) {
        query.category = category;
    }
    const products = await Product.find(query);
    res.status(200).json(products);
});

/*---------------------
@desc Get a single Product
@route GET /api/products/:id
@access Public
---------------------*/

export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    } else {
        res.status(200).json(product);
    }
});


/*---------------------
@desc Delete a Product
@route DELETE /api/products/:id
@access private (only admin)
---------------------*/
export const deleteProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
});


/*---------------------
@desc Update a Product
@route PUT /api/products/:id
@access private (only admin)
---------------------*/
export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateProduct(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const productUpdated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    return res.status(200).json({ message: 'Product updated successfully', productUpdated });
});


