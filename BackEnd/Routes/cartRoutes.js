import express from "express";
import {getCartCtrl, addToCartCtrl, updateCartItemCtrl, removeCartItemCtrl} from "../Controllers/cartController.js";
import {verifyUserToken, verifyToken} from "../Middleware/verifyToken.js";
import validateObjectId from "../Middleware/verifyObjectId.js";

const router = express.Router();

// Get user cart
router.route("/")
    .get(verifyToken, getCartCtrl)
    .post(verifyToken, addToCartCtrl)
    .put(verifyToken, updateCartItemCtrl);
// Remove item from cart
router.route("/:productId")
    .delete(verifyToken, validateObjectId, removeCartItemCtrl);
export default router;