import express from "express";
import { createUserCtrl, loginUserCtrl } from "../Controllers/authController.js";
//router object
const router = express.Router();
//register route
router.post("/register",createUserCtrl);
//login route
router.post("/login", loginUserCtrl);


export default router;