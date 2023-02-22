import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { v4 } from 'uuid';
import mailService from './mailService.js';
import tokenService from './tokenService.js';
import { UserDto } from "../dtos/UserDto.js";
import ApiError from '../error/ApiError.js';

const generateJwt = (id, email) => {
  return jwt.sign(
    { id, email },
    config.get('seckretKey'),
    {expiresIn: '24h'}
  );
}

class UserService {
  async register(email, password) {
    const candidate = await User.findOne({ email });
    if(candidate) {
      throw new Error(`User ${ email } is exists`);
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const activationLink = v4();

    const user = new User({ email, password: hashPassword, activationLink });
    await user.save();
    
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

    const userDto = new UserDto(user.email, user._id, user.isActivated);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`Invalid email or password`);
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      throw new Error(`Invalid email or password`);
    }

    const userDto = new UserDto(user.email, user._id, user.isActivated);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw new Error('Incorrect link to activate');
    }

    user.isActivated = true;
    await user.save();
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async check (id, login) {
    const token = generateJwt(id, login);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.unautharized();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user.email, user._id, user.isActivated);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService;