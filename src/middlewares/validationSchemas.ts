import Joi from '@hapi/joi';

//:::::::::::: COMMON SCHEMA OBJECTS :::::::::::::::::://
const fromTo = {
  from: Joi.date().iso().required(),
  to: Joi.date().iso().allow(null).required(),
};
const username = Joi.string()
  .email()
  .not(Joi.ref('password'))
  .messages({
    'any.invalid': 'username and password must be different',
  })
  .required();

const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const firstName = Joi.string().alphanum().min(3).max(30).required();

const lastName = Joi.string().alphanum().min(3).max(30).required();

export const objectIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

export const phoneSchema = Joi.string()
  .trim()
  .regex(/^[0-9]{7,10}$/)
  .required();

const address = Joi.string().min(8).max(50).required();
const reservationType = Joi.string().valid(...['counter', 'time']);
const unavailablities = Joi.array().items(
  Joi.object({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
  }),
);

const workingHours = Joi.array().items(
  Joi.object({
    ...fromTo,
    opensAt: Joi.number().integer().positive().required(),
    closesAt: Joi.number()
      .integer()
      .positive()
      .min(Joi.ref('opensAt'))
      .required(),
  }),
);

const sessionDurations = Joi.array().items(
  Joi.object({
    ...fromTo,
    duration: Joi.number().min(5).max(120).required(),
  }),
);
//::::::::::::::::::::::: VALIDATION SCHEMAS ::::::::::::::::::::::::::::/

export const DoctorProfileSchema = Joi.object({
  firstName,

  lastName,

  address,

  phone: phoneSchema,

  reservationType,

  unavailablities,

  workingHours,

  sessionDurations,
}).required();

export const patchDoctorSchema = DoctorProfileSchema.keys({
  firstName: firstName.optional(),

  lastName: lastName.optional(),

  address: address.optional(),

  phone: phoneSchema.optional(),

  reservationType: reservationType.optional(),

  unavailablities: unavailablities.optional(),

  workingHours: workingHours.optional(),

  sessionDurations: sessionDurations.optional(),
}).required();

export const PatientProfileSchema = Joi.object({
  firstName,
  lastName,
}).required();

export const signUpSchema = Joi.object({
  username,

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),

  userType: Joi.string()
    .valid(...['doctor', 'patient'])
    .required(),

  profile: Joi.when('userType', {
    is: 'doctor',
    then: DoctorProfileSchema,
    otherwise: PatientProfileSchema,
  }).required(),
}).required();

export const loginSchema = Joi.object({
  username,
  password,
}).required();

export const sessionSchema = Joi.object({
  patientId: objectIdSchema,
  doctorId: objectIdSchema,
  date: Joi.date().iso().required(),
}).required();

export const deviceSchema = Joi.object({
  fcmToken: Joi.string().required(),
  platform: Joi.string().required(),
}).required();
