import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// export const placeOrderCOD = async (req, res) => {
//   try {
//     const { userId, items, address,image } = req.body;
//     if (!address || !items || items.length === 0) {
//       return res.status(401).json({ message: "Invalid data" });
//     }
//     // let amount=await items.reduce(async (acc,item)=>{
//     //     const product =await Product.findById(item.product)
//     //     return (await acc)+product.offerPrice*item.quantity
//     // },0)
//     let amount = 0;
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product)
//         return res.status(404).json({ message: "Product not found" });
//       amount += product.offerPrice * item.quantity;
//     }
//     amount += Math.floor(amount * 0.02);

//     await Order.create({
//       userId,
//       item: items,
//       amount,
//       image,
//       address,
//       paymentType: "cod",
//     });
//     return res.status(200).json({ message: "Order placed successfully" });
//   } catch (error) {
//     return res.status(401).json({ message: error.message });
//   }
// };

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
     if (!userId) {
       return res.status(401).json({ success: false, message: "Kindly login first" });
    }

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ success: false, message: "Product not found" });

      orderItems.push({
        name:product.name,
        product: product._id,
        quantity: item.quantity,
        // image: {
        //   url: product.image.url,
        //   public_id: product.image.public_id,
        // },
        image: product.image,

      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // extra charges

    const order = await Order.create({
      userId,
      item: orderItems,
      amount,
      address,
      paymentType:"cod",
    });

    return res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log("userid from frontend",userId)
    if (!userId) return res.status(400).json({ message: "User ID required" });
    const orders = await Order.find({userId}).populate("item.product").sort({ createdAt:-1 });
    // console.log("orders from getorder",orders)
    res.status(200).json(orders);
  } catch (error) {
    // console.log(error.message)
    res.status(401).json({ message: error.message });
  }
};


// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ paymentType: "cod" }, 
//         { isPaid: true }],
//     })
//       .populate("item.product address")
//       .sort({ createdAt: -1 });
//     console.log("order", orders);
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//   .populate("userId", "name email")
//   .populate("item.product", "name offerPrice image")
//   .sort({ createdAt: -1 });

//   console.log(orders)
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      // .populate({ path: "userId", select: "name email", strictPopulate: false })
      // .populate({ path: "item.product", select: "name offerPrice image", strictPopulate: false })
      .sort({ createdAt: -1 });

    // console.log("Fetched orders:", orders);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

