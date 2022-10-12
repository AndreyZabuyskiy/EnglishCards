import ApiError from '../error/ApiError.js';
import moduleService from '../services/moduleService.js';
import fileService from '../services/fileService.js';

class ModuleController {
  async getModules (req, res, next) {
    try {
      const modules = await moduleService.getModulesByUser(req.user.id);
      res.status(200).json(modules);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async viewModule (req, res, next) {
    try {
      const { id } = req.params;
      const { module, cards } = await moduleService.viewModule(id);
      res.status(200).json({ module, cards });
    } catch (e) {
      next(ApiError.badRequest('Error view module'));
    }
  }

  async createModule (req, res, next) {
    try {
      const { title, cards } = req.body;
      const userId = req.user.id;
      
      const { createdModule } = await moduleService.createModule(title, userId, cards);
      return res.status(200).json(createdModule);
    }
    catch (e) {
      next(ApiError.badRequest('Error create module'));
    }
  }

  async updateModule (req, res, next) {
    try {
      const { id } = req.params;
      const { title, cards } = req.body;
      const userId = req.user.id;

      const module = await moduleService.updateModule(userId, id, title, cards);
      return res.status(200).json(module);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteModule (req, res, next) {
    try {
      const { id } = req.params;
      const deletedModule = await moduleService.deleteModule(id);
      
      res.status(200).json(deletedModule);
    } catch(e) {
      next(ApiError.badRequest('Error delete module'));
    }
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