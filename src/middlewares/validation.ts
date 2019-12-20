import { Request, Response, NextFunction } from "express";
import { signUpSchema } from "../config/schemas";

export function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}
