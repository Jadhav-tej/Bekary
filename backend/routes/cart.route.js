import express from "express";
import { updateCart } from "../controllers/cart.controller.js";
import AuthUser from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/update",AuthUser, updateCart);

export default router;
