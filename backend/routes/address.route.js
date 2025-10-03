import express from "express";
import { addAddres, getAddress } from "../controllers/address.controller.js";
import AuthUser from "../middleware/AuthUser.js";
// import { addAddress } from "../controllers/address.controller.js";

const router = express.Router();

router.post("/add",AuthUser, addAddres);
router.get("/get",AuthUser,getAddress);


export default router;
