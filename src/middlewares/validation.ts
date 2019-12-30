import { Request, Response, NextFunction } from "express";
import { signUpSchema, DoctorProfileSchema, loginSchema, PatientProfileSchema } from "../config/schemas";

export function validateSignUpBody(req: Request, res: Response, next: NextFunction) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const { userType } = req.body;

  let profileSchema;
  switch (userType) {
    case "doctor":
      profileSchema = DoctorProfileSchema;
      break;
    case "patient":
      profileSchema = PatientProfileSchema;
      break;
  }
  const profileValidationError = profileSchema.validate(req.body.profile).error;
  if (profileValidationError) return res.status(400).json({ message: profileValidationError.message });
  next();
}

export function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}
