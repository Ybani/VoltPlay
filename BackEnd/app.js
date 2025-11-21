import "./config/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";


dotenv.config();
// Initialize Express server
const server = express();
// Middleware
server.use(express.json());
server.use(cors({ origin: "*" }));
// Routes
server.use("/api/auth", authRoutes);




// Start the server
server.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
});
