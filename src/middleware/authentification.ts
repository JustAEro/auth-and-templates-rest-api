import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authentification = (
  req: Request<{}, {}, {currentUser: {id: string}}>,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  console.log(header)
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ message: "Internal server error: jwt secret is not provided" });
  }
  const decode = jwt.verify(token, jwtSecret) as {id: string};
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.body.currentUser = decode;

  next();
};