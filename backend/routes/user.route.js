import express from "express";
import { registerUser,loginUser, isAuth,logout } from "../controllers/user.controller.js";
import AuthUser from "../middleware/AuthUser.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

// router.post("/is-auth",AuthUser,isAuth);



export default router;
