import { Request, Response, NextFunction } from "express";
import { signUpSchema, parseErrorSchema } from "../config/schemas";

export function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.status(422).json({ message: error.message });

  next();
}
