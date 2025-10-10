import Address from "../models/address.model.js"

export const  addAddres=async(req,res)=>{
    try {
        
        const {address,userId}=req.body
        await Address.create({...address,userId})
        res.status(200).json({message:"address added"})
    } catch (error) {
            // console.log(error.message)
            res.status(401).json({message:error.message})
    }
}

export const  getAddress=async(req,res)=>{
try {
        const {userId}=req.body
        const address=await Address.find({userId})
        res.status(200).json({address})
    
} catch (error) {
    
}
}