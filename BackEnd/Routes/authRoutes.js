import express from "express";
import { createUserCtrl } from "../Controllers/auth.js";
//router object
const router = express.Router();
//register route
router.post("/register",createUserCtrl);



export default router;