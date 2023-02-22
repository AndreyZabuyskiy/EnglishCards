import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Invalid email').isLength({min: 4}),
  body('password', 'Minimum password length 6 characters').isLength({ min: 4, max: 32 })
]

export const loginValidation = [
  body('email', 'Invalid email').isLength({min: 4}),
  body('password', 'Minimum password length 6 characters').isLength({ min: 4, max: 32 })
]