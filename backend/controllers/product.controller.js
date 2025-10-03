// import moduleName from 'module'
// import { v2 as cloudinary } from "cloudinary";
// import { json } from 'stream/consumers'

// export const addProduct=async(req,res)=>{
//     try {
//         let productdata= JSON.parse(req.body.productdata)
//     } catch (error) {

//     }

// }

import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;

    //   // Cloudinary upload handled by multer-storage-cloudinary
    //  const image = req.file ? req.file.path : null;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }
    
   const allowedFormat = ["image/png", "image/jpeg", "image/jpg", "image/avif"];

    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "Invalid file format. Only PNG and JPG are allowed" });
    }

     const cloudResponse = await cloudinary.uploader.upload(image.path, {
      folder: "products",
    });
    if (!cloudResponse || cloudResponse.error) {
      return res
        .status(400)
        .json({ error: "Error uploading file to Cloudinary" });
    }

    // ✅ Cloudinary image URL

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      image: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.url,
      },
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error("Axios error:", err.response?.data || err.message);
res.status(500).json({ message: "Failed to add product", error: err.message });  }
};

// Get all products
export const ProductsLits = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });

  }
};


// Update a product
// import { v2 as cloudinary } from "cloudinary";


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, offerPrice } = req.body;

    if (!name || !description || !category || !price || !offerPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedData = {
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
    };

    // handle image upload
    if (req.file) {
      const cloudResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      updatedData.image = {
        url: cloudResponse.secure_url,
        public_id: cloudResponse.public_id,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);  // <--- this logs the real error
    res.status(500).json({ message: error.message });
  }
};



export const changeStock=async(req,res)=>{
    try {
            const {id,inStock}=req.body
            await Product.findByIdAndUpdate(id,{inStock})
                res.status(200).json({message:"stock Updated"});

    } catch (error) {
    res.status(500).json({ message: "Server error", error });
        
    }
}


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

