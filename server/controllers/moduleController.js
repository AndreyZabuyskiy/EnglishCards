import Word from '../models/Word.js';
import StudyModule from '../models/StudyModule.js';
import ApiError from '../error/ApiError.js';

class ModuleController {
  async getModules (req, res, next) {
    try{
      const modules = await StudyModule.find({ user: req.user.id });
      res.status(200).json(modules);
    } catch(e) {
      next(ApiError.badRequest('Error get all modules by id'));
    }
  }

  async viewModule (req, res, next) {
    try {
      const { id } = req.params;
      const module = await StudyModule.find({ _id: id });
      const words = await Word.find({ module: id });

      res.status(200).json({ module, words });
    } catch (e) {
      next(ApiError.badRequest('Error view module'));
    }
  }

  async createModule (req, res, next) {
    try {
      const words = req.body.words;

      const moduleDoc = new StudyModule({
        title: req.body.title,
        user: req.user.id
      });
  
      const module = await moduleDoc.save();
  
      words.map(async (word) => {
        const wordDoc = new Word({
          value: word.value,
          translate: word.translate,
          imgUrl: word.imgUrl,
          module: module._id
        });
  
        await wordDoc.save();
      });
      
      return res.status(200).json(module);
    }
    catch (e) {
      next(ApiError.badRequest('Error create module'));
    }
  }

  async updateModule (req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const module = {
        _id: id,
        title,
        user: req.user.id
      };

      const updateModule = await StudyModule.findByIdAndUpdate(id, module, { new: true });

      const words = await Word.find({ module: id });
      words.map(async (word) => {
        await Word.findByIdAndDelete(word._id);
      });

      const updateWords = req.body.words;

      updateWords.map(async (word) => {
        const wordDoc = new Word({
          value: word.value,
          translate: word.translate,
          imgUrl: word.imgUrl,
          module: id
        });
  
        await wordDoc.save();
      });

      return res.status(200).json(updateModule);
    } catch (e) {
      next(ApiError.badRequest('Error update module'));
    }
  }

  async deleteModule (req, res, next) {
    try {
      const { id } = req.params;
      const deletedModule = await StudyModule.findByIdAndDelete(id);
      res.status(200).json(deletedModule);
    } catch(e) {
      next(ApiError.badRequest('Error delete module'));
    }
  }
}

export default new ModuleController();