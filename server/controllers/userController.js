import ApiError from '../error/ApiError.js';
import { validationResult } from 'express-validator';
import userService from '../services/userService.js';

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return next(ApiError.badRequest("Incorrect login or password"));
      }
  
      const { login, password } = req.body;
      const token = await userService.register(login, password);
      res.status(201).json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return next(ApiError.badRequest("Incorrect login or password"));
      }
      
      const { login, password } = req.body;
      const token = await userService.login(login, password);
      res.status(200).json({ token }); 
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const { _id, login } = req.user;
      const token = await userService.check(_id, login);
      return res.status(200).json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new UserController();