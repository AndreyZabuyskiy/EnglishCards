import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const generateJwt = (id, login) => {
  return jwt.sign(
    { id, login },
    config.get('seckretKey'),
    {expiresIn: '24h'}
  );
}

class UserService {
  async register (login, password) {
    const candidate = await User.findOne({ login });
    if(candidate) {
      throw new Error(`User ${ login } is exists`);
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ login, password: hashPassword });
    await user.save();

    const token = generateJwt(user._id, login);
    return token;
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