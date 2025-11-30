import express from "express";
import { createUserCtrl, loginUserCtrl } from "../Controllers/auth.js";
//router object
const router = express.Router();
//register route
router.post("/register", createUserCtrl);
//login route
router.post("/login", loginUserCtrl);



export default router;