import express from 'express';
import { getAllUserCtrl, getUserCtrl, getUsersCountCtrl } from '../Controllers/userController.js';
import { verifyAdminToken, verifyUserToken } from '../Middleware/verifyToken.js';
import validateObjectId from '../Middleware/verifyObjectId.js';



const router = express.Router();

// Get all user profiles
router.route('/profile')
    .get(verifyAdminToken, getAllUserCtrl);
// Get users count
router.route('/count')
    .get(verifyAdminToken, getUsersCountCtrl);
//get single user profile
router.route('/profile/:id')
    .get(validateObjectId, getUserCtrl)
export default router;