import { Request, Response, NextFunction } from "express";
import {
  signUpSchema,
  loginSchema,
  sessionSchema,
  phoneSchema,
  objectIdSchema,
  deviceSchema
} from "../utils/validationSchemas";

export function validateDoctorIdParam(req: Request, res: Response, next: NextFunction) {
  const { error } = objectIdSchema.validate(req.params.doctorId);
  if (error) return res.status(412).json({ message: error.message });
  next();
}
export function validateSessionIdParam(req: Request, res: Response, next: NextFunction) {
  const { error } = objectIdSchema.validate(req.params.sessionId);
  if (error) return res.status(412).json({ message: error.message });
  next();
}
export function validatePhoneParam(req: Request, res: Response, next: NextFunction) {
  const { error } = phoneSchema.validate(req.params.phone);
  if (error) return res.status(412).json({ message: error.message });
  next();
}

export function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.status(412).json({ message: error.message });
  next();
}

export function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(412).json({ message: error.message });
  next();
}

export function validateSessionBody(req: Request, res: Response, next: NextFunction) {
  const { error } = sessionSchema.validate(req.body);
  if (error) return res.status(412).json({ message: error.message });
  next();
}

export function validateDeviceBody(req: Request, res: Response, next: NextFunction) {
  const { error } = deviceSchema.validate(req.body);
  if (error) return res.status(412).json({ message: error.message });
  next();
}
