import ApiError from '../error/ApiError.js';
import moduleService from '../services/moduleService.js';
import fileService from '../services/fileService.js';
import { validationResult } from 'express-validator';
import config from 'config';

class ModuleController {
  async getModules(req, res, next) {
    //try {
      const userId = req.user.id;
      const modules = await moduleService.getModulesByUser(userId);
      console.log('modules -->', modules);
      res.status(200).json(modules);
    //} catch (e) {
      //next(e);
    //}
  }

  async viewModule(req, res, next) {
    const userId = req.user.id;
    const moduleId = req.params.id;

    await moduleService.viewModule(userId, moduleId)
      .then((_module) => {
        res.status(200).json({
          data : _module,
          request: {
            type: "GET",
            url: `http://localhost:${config.get('port')}/api/module/`
          }
        });
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async getVisitedModules(req, res, next) {
    try {
      const userId = req.user.id;
      const modules = await moduleService.getVisitedModules(userId);
      res.status(200).json(modules);
    } catch (e) {
      next(e);
    }
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
      .then(studyModule => {
        return res.status(200).json({
          data: studyModule,
          request: {
            type: "GET",
            url: `http://localhost:${config.get('port')}/api/module/${studyModule.module._id}`
          }
        });
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
      .then(studyModule => {
        return res.status(200).json({
          data: studyModule,
          request: {
            type: "GET",
            url: `http://localhost:${config.get('port')}/api/module/${studyModule.module._id}`
          }
        });
      })
      .catch(e => {
        next(ApiError.badRequest(e.message));
      });
  }

  async deleteModule(req, res, next) {
    const { id } = req.params;

    try {
      const deletedModule = await moduleService.deleteModule(id);
      res.status(200).json({
        data: deletedModule,
        request: {
          type: "GET",
          url: `http://localhost:${config.get('port')}/api/module/`
        }
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    };
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