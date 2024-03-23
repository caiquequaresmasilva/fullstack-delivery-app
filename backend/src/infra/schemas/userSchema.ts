import Joi from 'joi';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': '"Name" length must be at least 3 characters long',
    'string.base': '"Name" should be a string',
    'any.required': '"Name" is required',
  }),
  email: Joi.string().regex(EMAIL_PATTERN).required().messages({
    'string.base': '"Email" should be a string',
    'any.required': '"Email" is required',
    'string.pattern.base': '"Email" must be a valid email',
  }),
  password: Joi.string().regex(PASSWORD_PATTERN).required().messages({
    'string.base': '"Password" should be a string',
    'any.required': '"Password" is required',
    'string.pattern.base': '"Password" must be a valid password',
  }),
  role: Joi.string().valid('customer', 'seller', 'admin').required().messages({
    'string.base': '"Role" should be a string',
    'any.required': '"Role" is required',
  }),
}).options({ abortEarly: false });
