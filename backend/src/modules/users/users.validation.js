import Joi from 'joi';

export const signupSchema = {
  body: Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.base': 'Full name must be a string.',
        'string.empty': 'Full name is required.',
        'string.min': 'Full name must be at least 3 characters long.',
        'string.max': 'Full name cannot exceed 50 characters.',
        'any.required': 'Full name is required.',
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.',
      }),
  }),
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.',
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.',
      }),
  }),
};
