import "./config/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import usersRoutes from "./Routes/usersRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";

dotenv.config();
// Initialize Express server
const server = express();
// Middleware
server.use(express.json());
server.use(cors({ origin: "*" }));
// Routes
server.use("/api/auth", authRoutes);
server.use("/api/products", productRoutes);
server.use("/api/users", usersRoutes);
server.use("/api/users/cart", cartRoutes);



// Start the server
server.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
});
