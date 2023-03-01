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
  body('cards.*.term')
    .notEmpty().withMessage('Term cannot be empty')
    .isString().withMessage('Term must be a string')
    .isLength({ max: 30 }).withMessage('Term must be no more than 30 characters'),
  body('cards.*.definition')
    .notEmpty().withMessage('Definition cannot be empty')
    .isString().withMessage('Definition must be a string')
    .isLength({ max: 30 }).withMessage('Definition must be no more than 30 characters'),
  body('cards.*.pathToFile').optional(),
  body('cards.*.urlToImage').optional()
]