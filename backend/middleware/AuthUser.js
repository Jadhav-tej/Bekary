import jwt from "jsonwebtoken";

const AuthUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decode ",decoded)

    if (!decoded?.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Attach userId to request object (not req.body)

    req.userId = decoded.id;
    

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default AuthUser;
