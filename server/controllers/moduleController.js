import ApiError from '../error/ApiError.js';
import moduleService from '../services/moduleService.js';
import fileService from '../services/fileService.js';
import { validationResult } from 'express-validator';

class ModuleController {
  async getModules (req, res, next) {
    const userId = req.user.id;

    await moduleService.getModulesByUser(userId)
      .then(modules => {
        res.status(200).json(modules);
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async viewModule (req, res, next) {
    const { id } = req.params;

    await moduleService.viewModule(id)
      .then((_module) => {
        const { module, cards } = _module;
        res.status(200).json({ module, cards });
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async createModule (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('errors --> ', errors);
      return next(ApiError.badRequest("Not valid data"));
    }

    const { title, description, cards } = req.body;
    const userId = req.user.id;
        
    await moduleService.createModule(userId, title, description, cards)
      .then(createdModule => {
        return res.status(200).json(createdModule);
      }).catch(err => {
        next(ApiError.badRequest('Error create module'));
      });
  }

  async updateModule (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('errors --> ', errors);
      return next(ApiError.badRequest("Not valid data"));
    }

    const { id } = req.params;
    const { title, description, cards } = req.body;
    const userId = req.user.id;

    await moduleService.updateModule(userId, id, title, description, cards)
      .then(_modele => {
        return res.status(200).json(_modele);
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async deleteModule (req, res, next) {
    const { id } = req.params;

    await moduleService.deleteModule(id)
      .then(deletedModule => {
        res.status(200).json(deletedModule);
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async uploadImage (req, res, next) {
    try {
      const { files, user } = req;
      const fileName = fileService.saveImage(files, user);
      return res.status(200).json(fileName);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeImage(req, res, next) {
    try {
      const { id } = req.params;
      const { user } = req;
      const fileName = fileService.removeImage(id, user);
      return res.status(200).json(fileName);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new ModuleController();