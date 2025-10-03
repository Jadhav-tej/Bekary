import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken"

// REGISTER Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
res.status(500).json({ message: "Server error", error: error.message });
  }
};
// LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
  


//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
//       res.cookie('token',token,{
//         httpOnly:true,
//         secure:process.env.NODE_ENV==="production",
//         sameSite:process.env.NODE_ENV==='production'?'none':'strict',
//         maxAge:7*24*60*60*1000,
//       })
//     return res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove password before sending user back
    const { password: _, ...userData } = user._doc;

    return res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // req.userId comes from AuthUser middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error in isAuth:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// export const logout=async(req,res)=>{
//   try{
//      res.cookie('token',token,{
//         httpOnly:true,
//         secure:process.env.NODE_ENV==="production",
//         sameSite:process.env.NODE_ENV==='production'?'none':'strict',
//       })
//       return res.status(200).json({message:"Logged Out"})
//   }
//   catch(err){
// console.log("error in logout",err)
//         res.status(500).json({error:"Error in logout"})
//   }
// }
export const logout=async(req,res)=>{
    try {
        if(!req.cookies.token){
            return res.status(401).json({message:"kindly login first"})
        }

        res.clearCookie("token")
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("error in logout",error)
        res.status(500).json({error:"Error in logout"})
        
    }
}