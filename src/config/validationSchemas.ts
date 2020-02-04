import Joi from "@hapi/joi";

//SCHEMA OBJECTS
const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .not(Joi.ref("password"))
  .messages({
    "any.invalid": "username and password must be different"
  })
  .required();

const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));

const firstName = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();

const lastName = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required();
const objectIdRegex = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

//VALIDATION SCHEMAS
export const DoctorProfileSchema = Joi.object({
  firstName,

  lastName,

  address: Joi.string()
    .min(8)
    .max(50)
    .required(),

  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{7,10}$/)
    .required(),

  holidays: Joi.array()
    .items(Joi.date())
    .required()
}).required();

export const PatientProfileSchema = Joi.object({
  firstName,

  lastName
}).required();

export const signUpSchema = Joi.object({
  username,

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required(),

  userType: Joi.string()
    .valid(...["doctor", "patient"])
    .required(),

  profile: Joi.when("userType", {
    is: "doctor",
    then: DoctorProfileSchema,
    otherwise: PatientProfileSchema
  }).required()
}).required();

export const loginSchema = Joi.object({
  username,
  password
}).required();

export const sessionSchema = Joi.object({
  patientId: objectIdRegex,
  doctorId: objectIdRegex,
  date: Joi.date()
    .iso()
    .required()
}).required();
