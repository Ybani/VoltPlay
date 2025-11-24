import express from 'express';
import {createProductCtrl, getProductsCtrl, getProductCtrl, updateProductCtrl ,deleteProductCtrl} from '../Controllers/productController.js';
import { verifyAdminToken } from '../Middleware/verifyToken.js';
import validateObjectId from '../Middleware/verifyObjectId.js';

const router = express.Router();

// create a new product
router.post('/', verifyAdminToken, createProductCtrl);
// get all products
router.get('/', getProductsCtrl);
// get a single product
router.get('/:id', validateObjectId, getProductCtrl);
// update a product
router.put('/:id', verifyAdminToken, validateObjectId, updateProductCtrl);
// delete a product
router.delete('/:id', verifyAdminToken, validateObjectId, deleteProductCtrl);

export default router;