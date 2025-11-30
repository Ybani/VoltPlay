import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, validateUser } from "../Models/User.js";


/*---------------------
@desc Register a new User
@route POST /api/auth/register
@access Public
---------------------*/

export const createUserCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "Email already used" });
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

/*---------------------
@desc Login User
@route POST /api/auth/login
@access Public
---------------------*/

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token (if JWT_SECRET exists)
    let token = null;
    const secret = process.env.JWT_SECRET || process.env.TOKEN_SECRET;
    if (secret) {
        const jwt = await import('jsonwebtoken');
        token = jwt.default.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            secret,
            { expiresIn: '30d' }
        );
    }

    // Return user data (excluding password)
    res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            phone: user.phone,
            address: user.address
        }
    });
})