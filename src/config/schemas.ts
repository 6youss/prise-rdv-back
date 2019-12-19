import Joi from "@hapi/joi";
import { ValidationError, ValidationErrorItem } from "@hapi/joi";

export function parseErrorSchema(errors: ValidationError): FieldErrors {
  const errs: FieldErrors = {};
  errors.details.forEach((error: ValidationErrorItem) => {
    errs[error.path.join(".")] = error.message;
  });
  return errs;
}

export const signUpSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required(),

  userType: Joi.string().required(),

  profile: Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
  })
});
