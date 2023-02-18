import ApiError from '../error/ApiError.js';
import moduleService from '../services/moduleService.js';
import fileService from '../services/fileService.js';
import { validationResult } from 'express-validator';
import config from 'config';

class ModuleController {
  async getModules (req, res, next) {
    const userId = req.user.id;

    await moduleService.getModulesByUser(userId)
    .then(serviceResponse => {
      /*const _modules = modules.map(item => {
        return {
          module: item,
          request: {
            type: "GET",
            url: `http://localhost:${config.get('port')}/api/module/`
          }
        }
      })*/
      
      /*const response = {
        count: modules.length,
        modules: _modules
      }*/
      res.status(200).json(serviceResponse);
    })
    .catch(e => {
      next(ApiError.badRequest(e.message));
    });
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
    const userId = req.user.id;

    await moduleService.getVisitedModules(userId)
      .then((responseService) => {
        res.status(200).json(responseService);
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

    //console.log('<-- createModule -->');
    //const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    //console.log('userData -->', userData);

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

  async deleteModule (req, res, next) {
    const { id } = req.params;

    await moduleService.deleteModule(id)
      .then(deletedModule => {
        res.status(200).json({
          data: deletedModule,
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