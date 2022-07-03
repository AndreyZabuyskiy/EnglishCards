const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const generateJwt = (id, login) => {
  return jwt.sign(
    { id, login },
    config.get('seckretKey'),
    {expiresIn: '24h'}
  );
}

class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return next(ApiError.badRequest("Incorrect login or password"));
    }

    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if(candidate) {
      return next(ApiError.badRequest("Incorrect login or password"));
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ login, password: hashPassword });
    await user.save();

    const token = generateJwt(user._id, login);
    res.status(201).json({ token });
  }

  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return next(ApiError.badRequest("Incorrect login or password"));
    }
    
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user) {
      return next(ApiError.internals(`User ${ login } not found`));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      return next(ApiError.internals('Invalid password'));
    }

    const token = generateJwt(user._id, login);
    res.status(200).json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user._id, req.user.login);
    return res.status(200).json({ token });
  }
}

module.exports = new UserController();