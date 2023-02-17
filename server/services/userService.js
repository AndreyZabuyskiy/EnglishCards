import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { v4 } from 'uuid';
import mailService from './mailService.js';
import tokenService from './tokenService.js';

const generateJwt = (id, email) => {
  return jwt.sign(
    { id, email },
    config.get('seckretKey'),
    {expiresIn: '24h'}
  );
}

class UserService {
  async register (email, password) {
    const candidate = await User.findOne({ email });
    if(candidate) {
      throw new Error(`User ${ email } is exists`);
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const activationLink = v4();
    const user = new User({ email, password: hashPassword, activationLink });
    await user.save();
    await mailService.sendActivationMail(email, activationLink);

    const tokens = tokenService.generateTokens(user._id, email);
    return tokens;
  }

  async login (login, password) {
    const user = await User.findOne({ login });
    if (!user) {
      throw new Error(`Invalid login or password`);
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      throw new Error(`Invalid login or password`);
    }

    const token = generateJwt(user._id, login);
    return token;
  }

  async check (id, login) {
    const token = generateJwt(id, login);
    return token;
  }
}

export default new UserService;