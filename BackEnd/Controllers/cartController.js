import asyncHandler from "express-async-handler";
import { User } from "../Models/User.js";

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private (logged-in user)
export const getCartCtrl = asyncHandler(async (req, res) => {
    // Populate full product details needed in cart UI
    const user = await User.findById(req.user._id).populate("cart.productId", "name price description category specs productPictures");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.cart);
});


// @desc    Add item to user cart
// @route   POST /api/users/cart
// @access  Private (logged-in user)
export const addToCartCtrl = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        // Update quantity if product already in cart
        user.cart[itemIndex].quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }

    await user.save();

    const populatedCart = await User.findById(req.user._id).populate("cart.productId", "name price description category specs productPictures");
    res.status(200).json(populatedCart.cart);
});

// @desc    Update item quantity in cart
// @route   PUT /api/users/cart
// @access  Private (logged-in user)
export const updateCartItemCtrl = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        user.cart[itemIndex].quantity = quantity; // set new quantity
        await user.save();
        const populatedCart = await User.findById(req.user._id).populate("cart.productId", "name price description category specs productPictures");
        return res.status(200).json(populatedCart.cart);
    } else {
        return res.status(404).json({ message: "Item not found in cart" });
    }
});

// @desc    Remove item from cart
// @route   DELETE /api/users/cart/:productId
// @access  Private (logged-in user)
export const removeCartItemCtrl = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    const populatedCart = await User.findById(req.user._id).populate("cart.productId", "name price description category specs productPictures");
    res.status(200).json(populatedCart.cart);
});
