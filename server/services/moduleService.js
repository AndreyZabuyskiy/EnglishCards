import StudyModule from "../models/StudyModule.js";
import Card from '../models/Card.js';

class ModuleService {
  async getModulesByUser(userId) {
    let data = [];
    const modules = await StudyModule.find({ user: userId });

    for(let mod of modules) {
      const cards = await Card.find({ module: mod._id });
      
      const obj = {
        ...mod._doc,
        countWords: cards.length
      }

      data.push(obj);
    }

    return data;
  }

  async viewModule (moduleId) {
    const module = await StudyModule.findById({ _id: moduleId });
    const cards = await Card.find({ module: moduleId });
    
    return { module, cards };
  }

  async createModule (title, userId, cards) {
    try{
      const moduleDoc = new StudyModule({
        title: title,
        user: userId
      });
  
      const createdModule = await moduleDoc.save();
      
      cards.map(async (card) => {
        const cardDoc = new Card({
          value: card.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          module: createdModule._id
        });
  
        await cardDoc.save();
      });

      return { createdModule, cards };
    } catch(e) {
      console.log(e.message);
    }
  }

  async updateModule (userId, moduleId, title, updateWords) {
    const module = {
      _id: moduleId,
      title,
      user: userId
    };

    const updateModule = await StudyModule.findByIdAndUpdate(moduleId, module, { new: true });

    const cards = await Card.find({ module: moduleId });
    cards.map(async (card) => await Card.findByIdAndDelete(card._id));

    updateWords.map(async card => {
      const cardDoc = new Card({
        value: card.value,
        translate: card.translate,
        imgUrl: card.imgUrl,
        module: moduleId
      });

      await cardDoc.save();
    });

    return updateModule;
  }

  async deleteModule (moduleId) {
    const deletedModule = await StudyModule.findByIdAndDelete(moduleId);
    
    const cards = await Card.find({ module: moduleId });
    cards.map(async card => {
      await Card.findByIdAndDelete(card._id);
    });

    return deletedModule;
  }
}

export default new ModuleService;