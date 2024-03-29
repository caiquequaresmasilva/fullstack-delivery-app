import Joi from "joi";

export const orderSchema = Joi.object({
  sellerId: Joi.string().uuid().required().messages({
    'string.base': '"sellerId" should be a string',
    'any.required': '"sellerId" is required',
    'string.guid': '"sellerId" must be a valid uuid'
  }),
  deliveryAddress: Joi.string().required().messages({
    'string.base': '"deliveryAddress" should be a string',
    'any.required': '"deliveryAddress" is required',
  }),
  deliveryNumber: Joi.string().required().messages({
    'string.base': '"deliveryNumber" should be a string',
    'any.required': '"deliveryNumber" is required',
  }),
  totalPrice: Joi.number().positive().required().messages({
    'number.base': '"totalPrice" should be a number',
    'number.positive': '"totalPrice" must be positive',
    'any.required': '"totalPrice" is required',
  }),
  products: Joi.array().items(Joi.object({
    id: Joi.string().uuid().required(),
    quantity: Joi.number().positive().integer().required()
  })).required().messages({
    'any.required': '"products" is required',
    'array.base': '"products" must be an array',
    'array.includes': '"products" must contain valid information'
  })
}).options({ abortEarly: false });