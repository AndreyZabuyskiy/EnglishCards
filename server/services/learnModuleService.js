import Card from '../models/Card.js';
import LearnModule from '../models/LearnModule.js';
import LearnModuleCard from '../models/LearnModuleCard.js';
import LearnModuleRound from '../models/LearnModuleRound.js';

class LearnModuleService {
  async getLearnModuleByModuleId(userId, moduleId) {
    const learnModules = await LearnModule.find({ user: userId, module: moduleId });
    if (learnModules.length === 0) {
      await this.createLearnModule(userId, moduleId);
    }

    const learnModule = await this.getLearnModule(userId, moduleId);
    return learnModule;
  }

  async getLearnModuleRound(moduleId) {
    const learnModule = await LearnModule.findById(moduleId);
    const rounds = await LearnModuleRound.find({ module: moduleId });

    let learnRound = null;

    if (rounds.length === 0) {
      learnRound = await this.createLearnModuleRound(learnModule._id);
    } else {
      learnRound = rounds[rounds.length - 1];
    }
    
    return learnRound;
  }

  async createLearnModule(userId, moduleId) {
    const cards = await Card.find({ module: moduleId });
    const learnModuleDoc = new LearnModule({
      user: userId,
      module: moduleId
    });

    const learnModule = await learnModuleDoc.save();

    await Promise.all(cards.map(async (_card, index) => {
      const learnCardDoc = new LearnModuleCard({
        module: learnModule._id,
        round: null,
        card: _card,
        status: 0
      });

      return await learnCardDoc.save();
    }));
  }

  async getLearnModule(userId, moduleId) {
    const learnModules = await LearnModule.find({ user: userId, module: moduleId });
    return learnModules[0];
  }

  async createLearnModuleRound(learnModuleId) {
    const learnModule = await LearnModule.findById(learnModuleId);
    const cards = await LearnModuleCard.find({ module: learnModule._id });
    const rounds = await LearnModuleRound.find({ module: learnModule._id });
    const learnRoundDoc = new LearnModuleRound({
      module: learnModule._id,
      round: rounds.length + 1,
      numberCurrentCard: 0
    });

    const round = await learnRoundDoc.save();

    for (let i = 0; i < 7; ++i) {
      const updatedCard = {
        _id: cards[i]._id,
        module: cards[i].module,
        card: cards[i].card,
        status: cards[i].status,
        round: round._id
      }

      await LearnModuleCard.findByIdAndUpdate(cards[i]._id, updatedCard, { new: true });
    }

    const roundUpdated = {
      module: round.module,
      round: round.round,
      numberCurrentCard: round.numberCurrentCard,
      totalNumberCards: 0,
      passedCards: 0
    }

    await LearnModuleRound.findByIdAndUpdate(round._id, roundUpdated, { new: true });
  }
}

export default new LearnModuleService();