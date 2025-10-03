
import express from "express";
import AuthUser from "../middleware/AuthUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/order.controller.js";
import AuthSeller from "../middleware/AuthSeller.js";
import { updateOrderStatus } from "../controllers/seller.controller.js";

const router = express.Router();

router.post("/cod",AuthUser,placeOrderCOD);
router.post("/user",AuthUser,getUserOrders);
router.get("/seller/orders",AuthSeller, getAllOrders);
router.patch("/seller/orders/:id", AuthSeller, updateOrderStatus);


export default router;
