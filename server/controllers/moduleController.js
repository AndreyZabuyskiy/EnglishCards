import Word from '../models/Word.js';
import StudyModule from '../models/StudyModule.js';
import ApiError from '../error/ApiError.js';

class ModuleController {
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
}

export default new ModuleController();