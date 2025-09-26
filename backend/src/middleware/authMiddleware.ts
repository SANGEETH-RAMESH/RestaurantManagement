import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { _id: string; email?: string }; 
    }
  }
}


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization,'Ss')
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment");
    }
    console.log(ACCESS_TOKEN_SECRET)
    console.log("TokeN:",token)
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload & { _id: string };
req.user = decoded;

    next();
  } catch (error) {
    const err = error as Error;
    console.error("JWT Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
