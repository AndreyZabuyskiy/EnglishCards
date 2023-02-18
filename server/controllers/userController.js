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
  
      const { email, password } = req.body;
      const userData = await userService.register(email, password);
      res.cookie('refreshToken', userData.refreshToken,
      {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      
      res.status(201).json(userData);
    } catch (err) {
      console.log('error -->', err);
      next(ApiError.badRequest(err));
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

  async activate(req, res, next) {
    const activationLink = req.params.link;

    await userService.activate(activationLink)
    .then(responseService => {
      res.redirect(progress.env.API_URL);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async check(req, res, next) {
    try {
      const { id, login } = req.user;
      const token = await userService.check(id, login);
      return res.status(200).json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new UserController();