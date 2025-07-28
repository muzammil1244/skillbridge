import jwt from "jsonwebtoken";
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ error: "Access Denied, No Token Provided" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // userID store
      next();
    } catch (error) {
      res.status(403).json({ error: "Invalid Token" });
    }
  }