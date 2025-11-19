import "./config/DB.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const server = express();

server.use(express.json());
server.use(cors({ origin: "*" }));

server.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
});
