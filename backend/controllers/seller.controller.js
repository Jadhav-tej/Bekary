import jwt from "jsonwebtoken";
import Order from "../models/order.model.js"
export const sellerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const envpass =process.env.ADMIN_PASS
    const envemail=process.env.ADMIN_EMAIL

    console.log(envemail,envpass)
    if (
      password === process.env.ADMIN_PASS &&
      email === process.env.ADMIN_EMAIL
    // password==="t" && email==="admin@123gmail.com"

    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("token",token)
      // res.cookie("sellerToken", token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   path:"/",
      // });
      res.cookie("sellerToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/", // ✅ must match in logout & middleware
});

      return res.status(200).json({ message: "Logged In" });
    } else {
      return res.status(401).json({ message: "Invalid crendential" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
};

export const sellerlogout = async (req, res) => {
  try {
    if (!req.cookies.sellerToken) {
      return res.status(401).json({ message: "kindly login first" });
    }

    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({  success: true,message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).json({ error: "Error in logout" });
  }


  // try {
  //       if(!req.cookies.token){
  //           return res.status(401).json({message:"kindly login first"})
  //       }

  //       res.clearCookie("sellertokene")
  //       res.status(200).json({message:"Logged out successfully"})
  //   } catch (error) {
  //       console.log("error in logout",error)
  //       res.status(500).json({error:"Error in logout"})
        
  //   }
};

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const validStatuses = ["pending", "baking", "out for delivery", "delivered"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({ message: "Order status updated", order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("item.product");

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// export const sellerlogout = async (req, res) => {
//   try {
//     if (!req.cookies.sellertoken) {
//       return res.status(401).json({ message: "Kindly login first" });
//     }

//     // Clear cookie — make sure path and options match how it was set
//     res.clearCookie("sellertoken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       path: "/", // ✅ important to match the login cookie
//     });

//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log("Error in logout:", error);
//     res.status(500).json({ error: "Error in logout" });
//   }
// };

