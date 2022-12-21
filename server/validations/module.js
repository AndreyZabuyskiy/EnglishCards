import { body } from "express-validator";

export const moduleValidation = [
  body('title')
    .notEmpty().withMessage('Title cannot be empty')
    .isString().withMessage('Title must be a string')
    .isLength({ max: 30 }).withMessage('Title must be no more than 30 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ max: 100 }).withMessage('Cards must have at least 2 elements'),
  body('cards').notEmpty()
    .withMessage('Cards cannot be empty')
    .isArray({min: 2, max: 100}).withMessage('Cards must be a list'),
  body('cards.*.value')
    .notEmpty().withMessage('Value cannot be empty')
    .isString().withMessage('Value must be a string')
    .isLength({ max: 30 }).withMessage('Value must be no more than 30 characters'),
  body('cards.*.translate')
    .notEmpty().withMessage('Translate cannot be empty')
    .isString().withMessage('Translate must be a string')
    .isLength({ max: 30 }).withMessage('Translate must be no more than 30 characters'),
  body('cards.*.pathToFile').optional()
]