import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  offerPrice: Number,
 image:{
        public_id:{
            type:String,
             required:true
        },
        url:{
            type:String,
        required:true
        }
    },
    inStock:{type:Boolean,default:true},
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
