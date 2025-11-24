import asyncHandler from 'express-async-handler';
import { User} from '../Models/User.js';

// @desc    Get all user profile
// @route   GET /api/users/profile
// @access  Private (ken lel admin)


export const getAllUserCtrl = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
});

// @desc    Get single user profile
// @route   GET /api/users/profile/:id
// @access  public
export const getUserCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");    //exclude password
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    } else {
        res.status(200).json(user);
    }
});

// @desc    Get users count
// @route   GET /api/users/count
// @access  Private (ken lel admin)
export const getUsersCountCtrl = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
});
