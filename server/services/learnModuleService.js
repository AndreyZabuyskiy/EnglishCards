import StudyModule from '../models/StudyModule.js';
import Card from '../models/Card.js';
import WriteModule from '../models/WriteModule.js';
import WriteCard from '../models/WriteCard.js';

class LearnModuleService {
  async getWriteModule(userId, moduleId) {
    const writesModules = await WriteModule.find({ module: moduleId, user: userId });

    if (writesModules.length === 0) {
      await this.createWriteModule(userId, moduleId);
    }

    const data = await this.getLastWriteModule(userId, moduleId);
    return data;
  }

  async createWriteModule(userId, moduleId) {
    const cards = await Card.find({ module: moduleId });
    const writesModules = await WriteModule.find({ module: moduleId, user: userId });

    const writeModuleDoc = new WriteModule({
      round: writesModules.length,
      module: moduleId,
      user: userId
    });

    const writeModule = await writeModuleDoc.save();

    await Promise.all(cards.map(async (card, index) => {
      const writeCardDoc = new WriteCard({
        index: index,
        isCorrect: false,
        card: card._id,
        writeModule: writeModule._id
      });

      return await writeCardDoc.save();
    }));
  }

  async getLastWriteModule(userId, moduleId) {
    const writeModules = await WriteModule.find({ user: userId, module: moduleId });
    const writeModule = writeModules[writeModules.length - 1];

    const writeCards = await WriteCard.find({ writeModule: writeModule._id });
    const cards = [];

    await Promise.all(writeCards.map(async (writeCard, index) => {
      const card = await Card.find({ _id: writeCard.card });

      const responseCard = {
        _id: writeCard._id,
        index: writeCard.index,
        status: writeCard.status,
        writeModule: writeCard.writeModule,
        card: card[0]
      };
      
      cards.push(responseCard);
    }));

    return { writeModule, cards }
  }
}

export default new LearnModuleService;