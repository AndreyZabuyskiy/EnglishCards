import ApiError from '../error/ApiError.js';
import moduleService from '../services/moduleService.js';

class ModuleController {
  async getModules (req, res, next) {
    try{
      const modules = await moduleService.getModulesByUser(req.user.id);
      res.status(200).json(modules);
    } catch(e) {
      next(ApiError.badRequest('Error get all modules by id'));
    }
  }

  async viewModule (req, res, next) {
    try {
      const { id } = req.params;
      const { module, words } = await moduleService.viewModule(id);
      res.status(200).json({ module, words });
    } catch (e) {
      next(ApiError.badRequest('Error view module'));
    }
  }

  async createModule (req, res, next) {
    try {
      const { title, words } = req.body;
      const userId = req.user.id;

      const { createdModule } = await moduleService.createModule(title, userId, words);
      return res.status(200).json(createdModule);
    }
    catch (e) {
      next(ApiError.badRequest('Error create module'));
    }
  }

  async updateModule (req, res, next) {
    try {
      const { id } = req.params;
      const { title, words } = req.body;
      const userId = req.user.id;

      const module = await moduleService.updateModule(userId, id, title, words);
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
}

export default new ModuleController();