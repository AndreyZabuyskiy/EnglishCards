import Card from '../models/Card.js';
import LearnCardOption from '../models/LearnCardOption.js';
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

  async getLearnRoundByModuleId(moduleId) {
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

  async getLearnRoundById(roundId) {
    const round = await LearnModuleRound.findById(roundId);
    return round;
  }

  async getCardByRoundId(roundId) {
    const round = await LearnModuleRound.findById(roundId);
    const cards = await LearnModuleCard.find({ round: round._id });

    const findCard = await cards.find(card => card.index === round.indexCurrentCard);
    
    const card = await Card.findById(findCard.card);

    const learnCard = {
      _id: findCard._id,
      value: card.value,
      translate: card.translate,
      pathToFile: card.pathToFile,
      urlToImage: card.urlToImage,
      round: findCard.round,
      status: findCard.status,
      isDone: false
    }
    
    let options = [];
    if (findCard.status === 0) {
      const findOptions = await LearnCardOption.find({ card: findCard._id });

      for (let i = 0; i < findOptions.length; ++i) {
        options.push({
          _id: findOptions[i]._id,
          card: findOptions[i].card._id,
          value: findOptions[i].value,
          isRight: findOptions[i].isRight
        });
      }
    }

    return { learnCard, options };
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
        status: 0,
        index: index,
        isDone: false
      });

      return await learnCardDoc.save();
    }));

    const learnCards = await LearnModuleCard.find({ module: learnModule._id });
    learnCards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }
      
      return 0;
    });
    
    await Promise.all(learnCards.map(async (learnCard, index) => {
      if (learnCard.index < 4) {
        for (let i = 0; i < 4; ++i) {
          let cardId = learnCards[i].card;
          const card = await Card.findById(cardId);
          const isRightCard = learnCard._id === learnCards[i]._id;

          console.log('card ==>', card);

          const optionDoc = new LearnCardOption({
            card: learnCard,
            value: card.value,
            isRight: isRightCard
          });

          await optionDoc.save();
        }
      } else {
        for (let i = learnCard.index; i > learnCard.index - 4; --i) {
          let cardId = learnCards[i].card;
          const card = await Card.findById(cardId);
          const isRightCard = learnCard._id === learnCards[i]._id;

          const optionDoc = new LearnCardOption({
            card: learnCard,
            value: card.value,
            isRight: isRightCard
          });

          await optionDoc.save();
        }
      }
    }));
  }

  async getLearnModule(userId, moduleId) {
    const learnModules = await LearnModule.find({ user: userId, module: moduleId });
    return learnModules[0];
  }

  async createLearnModuleRound(learnModuleId) {
    const learnModule = await LearnModule.findById(learnModuleId);
    const rounds = await LearnModuleRound.find({ module: learnModule._id });
    const cards = await LearnModuleCard.find({ module: learnModule._id });
    
    cards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }

      return 0;
    });
    
    const learnRoundDoc = new LearnModuleRound({
      module: learnModule._id,
      round: rounds.length + 1
    });

    const round = await learnRoundDoc.save();

    const roundCards = [];

    for (let i = 0; i < 7; ++i) {
      const updatedCard = {
        module: cards[i].module,
        card: cards[i].card,
        status: cards[i].status,
        index: cards[i].index,
        round: round._id,
        isDone: false
      }

      const roundCard = await LearnModuleCard.findByIdAndUpdate(cards[i]._id, updatedCard, { new: true });
      console.log('createLearnModuleRound roundCard ===>', roundCard);
      roundCards.push(roundCard);
    }

    const roundUpdated = {
      module: round.module,
      round: round.round,
      totalNumberCards: roundCards.length,
      passedCards: 0,
      indexCurrentCard: 0
    }

    await LearnModuleRound.findByIdAndUpdate(round._id, roundUpdated, { new: true });
  }

  async checkLearnTestCard(cardId, optionId) {
    const card = await LearnModuleCard.findById(cardId);
    const round = await LearnModuleRound.findById(card.round);
    const option = await LearnCardOption.findById(optionId);
    
    const indexCurrentCard = round.indexCurrentCard + 1;
    let passedCards = round.passedCards;

    if (option.isRight) {
      passedCards += 1;
      const status = card.status + 1;

      const updatedCard = {
        module: card.module,
        round: card.round,
        card: card.card,
        index: card.index,
        status: status,
        isDone: true
      }

      const _updatedCard = await LearnModuleCard.findByIdAndUpdate(card._id, updatedCard, { new: true });
    }

    const updatedRound = {
      module: round.module,
      round: round.round,
      totalNumberCards: round.totalNumberCards,
      indexCurrentCard,
      passedCards
    }

    await LearnModuleRound.findByIdAndUpdate(round._id, updatedRound, { new: true });

    return option.isRight;
  }

  async getResultRoundById(roundId) {
    const round = await LearnModuleRound.findById(roundId);
    const learnModule = await LearnModule.findById(round.module);
    const cards = await LearnModuleCard.find({ module: learnModule._id });
    console.log('getResultRoundById cards -->', cards);
    const roundCards = await LearnModuleCard.find({ round: round._id });
    //const roundCards = cards.filter(card => card.round === round._id);
    console.log('getResultRoundById roundCards -->', roundCards);

    return { round, lengthModuleCards: cards.length, cards: roundCards };
  }
}

export default new LearnModuleService();