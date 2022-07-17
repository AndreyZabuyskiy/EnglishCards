import StudyModule from "../models/StudyModule.js";
import Word from '../models/Word.js';

class ModuleService {
  async getModulesByUser (userId) {
    let data = [];
    const modules = await StudyModule.find({ userId });

    for(let mod of modules) {
      const words = await Word.find({ module: mod._id });
      
      const obj = {
        ...mod._doc,
        countWords: words.length
      }

      data.push(obj);
    }

    return data;
  }

  async viewModule (moduleId) {
    const module = await StudyModule.findById({ _id: moduleId });
    const words = await Word.find({ module: moduleId });
    
    return { module, words };
  }

  async createModule (title, userId, words) {
    const moduleDoc = new StudyModule({
      title: title,
      user: userId
    });

    const createdModule = await moduleDoc.save();

    words.map(async (word) => {
      const wordDoc = new Word({
        value: word.value,
        translate: word.translate,
        imgUrl: word.imgUrl,
        module: createdModule._id
      });

      await wordDoc.save();
    });

    return { createdModule, words };
  }

  async updateModule (userId, moduleId, title, updateWords) {
    const module = {
      _id: moduleId,
      title,
      user: userId
    };

    const updateModule = await StudyModule.findByIdAndUpdate(moduleId, module, { new: true });

    const words = await Word.find({ module: moduleId });
    words.map(async (word) => {
      await Word.findByIdAndDelete(word._id);
    });

    updateWords.map(async word => {
      const wordDoc = new Word({
        value: word.value,
        translate: word.translate,
        imgUrl: word.imgUrl,
        module: moduleId
      });

      await wordDoc.save();
    });

    return updateModule;
  }

  async deleteModule (moduleId) {
    const deletedModule = await StudyModule.findByIdAndDelete(moduleId);
    
    const words = await Word.find({ module: moduleId });
    words.map(async word => {
      await Word.findByIdAndDelete(word._id);
    });

    return deletedModule;
  }
}

export default new ModuleService;