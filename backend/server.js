import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import sellerRoutes from './routes/seller.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import addressRoutes from './routes/address.route.js'
import orderRouter from './routes/order.route.js'

 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();
const app = express();
const allowedOrigins=['http://localhost:5173',"https://bekary-fdur.vercel.app"]
// Middleware
app.use(cookieParser())
app.use(cors({origin: allowedOrigins,credentials:true }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRouter);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

await connectCloudinary();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

