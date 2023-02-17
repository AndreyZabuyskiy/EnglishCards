import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Invalid login').isLength({ min: 4 }),
  body('password', 'Minimum password length 6 characters').isLength({ min: 4 })
]

export const loginValidation = [
  body('login', 'Invalid login').isLength({ min: 4 }),
  body('password', 'Minimum password length 6 characters').isLength({ min: 4 })
]