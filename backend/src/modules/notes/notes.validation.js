import Joi from 'joi';

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages({
        'string.base': 'Title must be a string.',
        'string.empty': 'Title is required.',
        'string.min': 'Title must be at least 1 character long.',
        'string.max': 'Title cannot exceed 100 characters.',
        'any.required': 'Title is required.',
      }),
    content: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.base': 'Content must be a string.',
      }),
    tags: Joi.array()
      .items(Joi.string().messages({
        'string.base': 'Each tag must be a string.',
      }))
      .optional()
      .messages({
        'array.base': 'Tags must be an array.',
      }),
    isPinned: Joi.boolean()
      .optional()
      .messages({
        'boolean.base': 'isPinned must be a boolean.',
      }),
  }),
};

export const editNoteSchema = {
  body: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .optional()
      .messages({
        'string.base': 'Title must be a string.',
        'string.min': 'Title must be at least 1 character long.',
        'string.max': 'Title cannot exceed 100 characters.',
      }),
    content: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.base': 'Content must be a string.',
      }),
    tags: Joi.array()
      .items(Joi.string().messages({
        'string.base': 'Each tag must be a string.',
      }))
      .optional()
      .messages({
        'array.base': 'Tags must be an array.',
      }),
    isPinned: Joi.boolean()
      .optional()
      .messages({
        'boolean.base': 'isPinned must be a boolean.',
      }),
  }),
  params: Joi.object({
    noteId: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.base': 'noteId must be a string.',
        'string.hex': 'noteId must be a valid hexadecimal string.',
        'string.length': 'noteId must be exactly 24 characters long.',
        'any.required': 'noteId is required in the URL parameters.',
      }),
  }),
};
