import jwt from "jsonwebtoken";

const AuthSeller = async (req, res, next) => {
  const sellerToken = req.cookies.sellerToken;   
  // console.log("sellerToken", sellerToken);

  if (!sellerToken) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    // console.log("decode seller", decoded);

    // Check if admin email matches
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Attach sellerId to request object
    req.userId = decoded.email;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default AuthSeller;
