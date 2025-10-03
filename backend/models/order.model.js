import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 userId:{type:String,required:true,ref:'user'},
 item:[
    {   name:{type:String,required:true} ,
        quantity:{type:Number,required:true} ,
        product:{type:String,required:true,ref:'Product'},
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
    }
 ],
 amount:{type:Number,required:true} ,
address:{type:String,required:true,ref:'address '} ,
status:{type:String,default:"order Placed"},
paymentType:{type:String,required:true} ,
isPaid:{type:Boolean,required:true,default:false} 



},{timestamps:true});

export default mongoose.model("Order", orderSchema);
