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

  async createModule(userId, title, description, cards) {
    const moduleDoc = new StudyModule({
      title,
      description,
      user: userId
    });
  
    const newModule = await moduleDoc.save();
    
    cards.map(async (card) => {
      const cardDoc = new Card({
        value: card.value,
        translate: card.translate,
        pathToFile: card.pathToFile,
        urlToImage: card.urlToImage,
        module: newModule._id
      });
  
      await cardDoc.save();
    });

    return { module: newModule, cards };
  }

  async updateModule(userId, moduleId, title, description, cards) {
    const module = {
      _id: moduleId,
      title,
      description,
      user: userId
    };

    const updateModule = await StudyModule.findByIdAndUpdate(moduleId, module, { new: true });

    const findCards = await Card.find({ module: moduleId });
    findCards.map(async (card) => await Card.findByIdAndDelete(card._id));

    cards.map(async card => {
      const cardDoc = new Card({
        value: card.value,
        translate: card.translate,
        imgUrl: card.imgUrl,
        module: moduleId
      });

      await cardDoc.save();
    });

    return { module: updateModule, cards };
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