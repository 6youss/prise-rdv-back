import Joi from "@hapi/joi";

export const DoctorProfileSchema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  holidays: Joi.array()
    .items(Joi.date())
    .required()
}).required();

export const PatientProfileSchema = Joi.object({
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
}).required();

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

  userType: Joi.string()
    .valid(...["doctor", "patient"])
    .required(),

  profile: Joi.object().required()
}).required();

export const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .not(Joi.ref("password"))
    .messages({
      "any.invalid": "username and password must be different"
    })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
}).required();
