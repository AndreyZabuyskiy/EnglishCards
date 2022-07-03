const ApiError = require('../error/ApiError');

class UserController {
  async registration(req, res) {

  }

  async login(req, res) {
    const { id } = req.query;
    
    if(!id) {
      return next(ApiError.badRequest('Не задано id'));
    }

    res.json(id);
  }

  async check(req, res, next) {
    const { id } = req.query;
    
    if(!id) {
      return next(ApiError.badRequest('Не задано id'));
    }

    res.json(id);
  }
}

module.exports = new UserController();