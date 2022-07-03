const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

router.post(
  "/registration",
  [
    check('login', 'Invalid login').isLength({ min: 4 }),
    check('password', 'Minimum password length 6 characters').isLength({ min: 4 })
  ],
 userController.registration);

router.post(
  "/login",
  [
    check('login', 'Invalid login').isLength({ min: 4 }),
    check('password', 'Minimum password length 6 characters').isLength({ min: 4 })
  ],
  userController.login);

router.get("/auth", authMiddleware, userController.check);

module.exports = router;