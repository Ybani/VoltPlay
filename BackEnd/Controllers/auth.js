import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, validateUser } from "../Models/User.js";


/*---------------------
@desc Register a new User
@route POST /api/auth/register
@access Public
---------------------*/

export const createUserCtrl = asyncHandler(async (req, res) =>{
    const {error} = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    let user = await User.findOne({ email: req.body.email});
    if (user){
        return res.status(400).json({ message: "Email already used"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully, please login" });
})