import "./config/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import analyticsRoutes from "./Routes/analyticsRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";


dotenv.config();
// Initialize Express server
const server = express();
// Middleware
server.use(express.json());
server.use(cors({ origin: "*" }));
// Routes
server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);
server.use("/api/analytics", analyticsRoutes);
server.use("/api/reviews", reviewRoutes);

import { notFound, errorHandler } from './Middleware/errorMiddleware.js';

server.use(notFound);
server.use(errorHandler);




// Start the server
server.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
});
