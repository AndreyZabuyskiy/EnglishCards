import StudyModule from '../models/StudyModule.js';
import Card from '../models/Card.js';
import WriteModule from '../models/WriteModule.js';
import WriteCard from '../models/WriteCard.js';

class LearnModuleService {
  async createWriteModule(userId, moduleId) {
    const module = await StudyModule.findById({ _id: moduleId });
    const cards = await Card.find({ module: moduleId });

    const writeModuleDoc = new WriteModule({
      currentIndex: 1,
      round: 1,
      module: moduleId,
      user: userId
    });

    const writeModule = await writeModuleDoc.save();
    const writeCards = [];

    await Promise.all(cards.map(async (card, index) => {
      const writeCardDoc = new WriteCard({
        index: index,
        isCorrect: false,
        card: card,
        writeModule: writeModule._id
      });

      return await writeCardDoc.save();
    }))
    .then(cards => {
      cards.map(card => {
        writeCards.push(card);
      })
    });

    return { writeModule, writeCards };
  }
}

export default new LearnModuleService;