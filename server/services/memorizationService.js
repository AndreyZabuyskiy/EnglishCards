import MemorizationOfModule from '../models/MemorizationOfModule.js';
import MemorizationStatus from '../helpers/MemorizationStatus.js';
import MemorizationOfCard from '../models/MemorizationOfCard.js';
import Card from '../models/Card.js';

class MemorizationService {
  async createModulesByUserId(userId) {
    for(const status of MemorizationStatus) {
      const module = await MemorizationOfModule({
        user: userId,
        status
      });

      await module.save();
    }
  }
  
  async addCard(moduleId, cardId) {
    const module = await MemorizationOfModule.findById(moduleId);
    const card = await Card.findById(cardId);

    const memoCards = await MemorizationOfCard.find({ module: moduleId });
    const newMemoCard = await MemorizationOfCard({
      term: card.term,
      definition: card.definition,
      pathToFile: card.pathToFile,
      urlToImage: card.urlToImage,
      position: memoCards.length,
      card: card._id,
      module: module._id
    });

    const savedCard = await newMemoCard.save();
    return savedCard;
  }

  async getModuleById(moduleId) {
    const module = await MemorizationOfModule.findById(moduleId);
    const cards = await MemorizationOfCard.find({ module: moduleId });

    return { module, cards };
  }

  async getModulesByUserId(userId) {
    const modules = await MemorizationOfModule.find({ user: userId });
    let result = [];

    await Promise.all(modules.map(async module => {
      const cards = await MemorizationOfCard.find({ module: module._id });
      result.push({ module, countCards: cards.length });
    }));

    result = this.sortModulesByStatus(result);

    return result;
  }

  sortModulesByStatus(modules) {
    const sortedModules = [];
    for(const status of MemorizationStatus) {
      const module = modules.find(m => m.module.status === status);
      sortedModules.push(module);
    }

    return sortedModules;
  }
}

export default new MemorizationService();