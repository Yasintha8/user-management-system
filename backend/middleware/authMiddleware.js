import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verify error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("✅ Middleware decoded:", decoded);
    req.user = { id: decoded.id }; // store consistent id
    next();
  });
};
