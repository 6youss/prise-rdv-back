import { Request, Response, NextFunction } from "express";
import { signUpSchema, loginSchema, sessionSchema } from "../config/schemas";

export function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}

export function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}

export function validateSessionBody(req: Request, res: Response, next: NextFunction) {
  const { error } = sessionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}
