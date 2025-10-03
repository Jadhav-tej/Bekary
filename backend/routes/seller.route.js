import express from "express";
import { sellerlogin,sellerlogout } from "../controllers/seller.controller.js";
import AuthUser from "../middleware/AuthUser.js";
import { isAuth } from "../controllers/user.controller.js";
import AuthSeller from "../middleware/AuthSeller.js";

const router = express.Router();

// Register route

router.post("/login", sellerlogin);
router.post("/logout",AuthSeller, sellerlogout);
// router.get("/is-auth", isAuth);


router.post("/is-auth",AuthUser,isAuth);



export default router;
