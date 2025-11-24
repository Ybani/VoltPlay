import mongoose from "mongoose";

export default function validateObjectId(req, res, next) {
    const candidate = req.params.id || req.params.productId || req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(candidate)) {
        return res.status(400).json({ message: "Invalid Object ID" });
    }
    next();
}
