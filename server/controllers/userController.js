import ApiError from '../error/ApiError.js';
import { validationResult } from 'express-validator';
import userService from '../services/userService.js';

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return next(ApiError.badRequest("Incorrect email or password"));
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
      
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken,
      {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      res.status(200).json(userData); 
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async activate(req, res, next) {
    const activationLink = req.params.link;

    await userService.activate(activationLink)
    .then(_ => {
      res.redirect('http://localhost:3000/home');
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;

    await userService.logout(refreshToken)
    .then(responseService => {
      const token = responseService;
      res.clearCookie('refreshToken');
      return res.json(token);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken,
      {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();