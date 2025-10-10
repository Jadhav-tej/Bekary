import User from "../models/User.model.js"

export const updateCart =async(req,res)=>{
    try {
        const {userId,cartItem}=req.body
        await User.findByIdAndUpdate(userId,{cartItem})
        res.status(200).json({message:"cart Updated"})
        
    } catch (error) {
        // console.log(error.message)
        res.status(401).json({message:error.message})
    }
}