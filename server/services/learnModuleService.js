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

    const findCard = cards.find(card => card.index === round.indexCurrentCard);
    const card = await Card.findById(findCard.card);

    const learnCard = {
      _id: findCard._id,
      term: card.term,
      definition: card.definition,
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
          term: findOptions[i].term,
          isRight: findOptions[i].isRight
        });
      }
    }
    
    options = this.mixUpOptions(options);

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

          const optionDoc = new LearnCardOption({
            card: learnCard,
            term: card.term,
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
            term: card.term,
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

    const writeCards = cards.filter(card => card.status === 1);
    writeCards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }

      return 0;
    });

    const testCards = cards.filter(card => card.status === 0);
    testCards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }

      return 0;
    });

    const lengthCardsRound = writeCards.length >= 7 ? 7 : writeCards.length;

    for (let i = 0; i < lengthCardsRound; ++i) {
      const updatedCard = {
        module: writeCards[i].module,
        card: writeCards[i].card,
        status: writeCards[i].status,
        index: writeCards[i].index,
        round: round._id,
        isDone: false
      }

      const roundCard = await LearnModuleCard.findByIdAndUpdate(writeCards[i]._id, updatedCard, { new: true });
      roundCards.push(roundCard);
    }

    if (roundCards.length <= 7) {
      let countCards = 7 - roundCards.length;
      countCards = countCards > testCards.length ? testCards.length : countCards;

      for (let i = 0; i < countCards; ++i) {
        const updatedCard = {
          module: testCards[i].module,
          card: testCards[i].card,
          status: testCards[i].status,
          index: testCards[i].index,
          round: round._id,
          isDone: false
        }

        const roundCard = await LearnModuleCard.findByIdAndUpdate(testCards[i]._id, updatedCard, { new: true });
        roundCards.push(roundCard);
      }
    }

    roundCards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }

      return 0;
    });

    const roundUpdated = {
      module: round.module,
      round: round.round,
      totalNumberCards: roundCards.length,
      passedCards: 0,
      indexCurrentCard: roundCards[0].index
    }

    const newRound = await LearnModuleRound.findByIdAndUpdate(round._id, roundUpdated, { new: true });
    return newRound;
  }

  async checkLearnTestCard(cardId, optionId) {
    const card = await LearnModuleCard.findById(cardId);
    const round = await LearnModuleRound.findById(card.round);
    const option = await LearnCardOption.findById(optionId);
    const cards = await LearnModuleCard.find({ round: round._id });
    
    const indexCurrentCard = await this.getNewPosition(round, cards);
    let passedCards = round.passedCards;

    if (option.isRight) {
      passedCards += 1;
      const status = card.status + 1;

      const options = await LearnCardOption.find({ card: card._id });
      await Promise.all(options.map(async opt => {
        await LearnCardOption.deleteOne({ _id: opt._id });
      }));

      const updatedCard = {
        module: card.module,
        round: card.round,
        card: card.card,
        index: card.index,
        status: status,
        isDone: true
      }

      await LearnModuleCard.findByIdAndUpdate(card._id, updatedCard, { new: true });
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
    const allCardsByModule = await LearnModuleCard.find({ module: learnModule._id });
    const lengthModuleCards = allCardsByModule.length;
    const learnedCards = allCardsByModule.filter(card => card.status > 0);
    const roundCards = await LearnModuleCard.find({ round: round._id });
    
    const cards = [];
    await Promise.all(roundCards.map(async (_card) => {
      const card = await Card.findById(_card.card);
      const { _id, term, definition, pathToFile, urlToImage } = card;
      cards.push({_id, term, definition, pathToFile, urlToImage});
    }));
    
    return { round, lengthModuleCards, countLearnedCards: learnedCards.length, cards };
  }

  async getNewPosition(round, cards) {
    cards.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } else if (a.index < b.index) {
        return -1;
      }

      return 0;
    });

    const minPositionCard = cards[0].index;
    const maxPositionCard = cards[cards.length - 1].index;

    let newPosition = -1;
    let iterator = 0;

    if (round.indexCurrentCard >= maxPositionCard) {
      iterator = minPositionCard;
    } else {
      const itemIndex = cards.findIndex(el => el.index === round.indexCurrentCard);
      iterator = cards[itemIndex + 1].index;
    }

    for (let i = 0; i < round.totalNumberCards; ++i) {
      const card = cards.find(card => card.index === iterator);

      if (!card.isDone) {
        newPosition = iterator;
        break;
      }

      const itemIndex = cards.findIndex(el => el.index === iterator);

      if (itemIndex >= cards.length - 1) {
        iterator = minPositionCard;
      } else {
        iterator = cards[itemIndex + 1].index;
      }
    }
    
    return newPosition;
  }

  async checkLearnWriteCard(cardId, isCorrectAnswer) {
    const learnCard = await LearnModuleCard.findById(cardId);
    const round = await LearnModuleRound.findById(learnCard.round);
    const cards = await LearnModuleCard.find({ round: round._id });
    
    const indexCurrentCard = await this.getNewPosition(round, cards);
    let passedCards = round.passedCards + 1;
    let status = learnCard.status;

    if (isCorrectAnswer) {
      status = learnCard.status + 1;
    }
    
    const updatedCard = {
      module: learnCard.module,
      round: learnCard.round,
      card: learnCard.card,
      index: learnCard.index,
      status: status,
      isDone: true
    }

    await LearnModuleCard.findByIdAndUpdate(learnCard._id, updatedCard, { new: true });

    const updatedRound = {
      module: round.module,
      round: round.round,
      totalNumberCards: round.totalNumberCards,
      indexCurrentCard,
      passedCards
    }

    await LearnModuleRound.findByIdAndUpdate(round._id, updatedRound, { new: true });

    return { isCorrectAnswer };
  }

  async completionCheckModule(moduleId) {
    const cards = await LearnModuleCard.find({ module: moduleId });
    let isDone = true;

    cards.forEach(card => {
      if (card.status !== 2) {
        isDone = false;
      }
    });

    return isDone;
  }

  async deleteModuleById(moduleId) {
    const module = await LearnModule.findById(moduleId);
    const rounds = await LearnModuleRound.find({ module: moduleId });
    const cards = await LearnModuleCard.find({ module: moduleId });

    await Promise.all(cards.map(async card => {
      await LearnModuleCard.deleteOne({ _id: card._id });
    }));

    await Promise.all(rounds.map(async round => {
      await LearnModuleRound.findByIdAndDelete({ _id: round._id });
    }));

    await LearnModule.findByIdAndDelete({ _id: moduleId });

    return true;
  }

  mixUpOptions(options) {
    const positions = [];

    while (positions.length < 4) {
      const randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
      let isThere = false;

      for (let i = 0; i < positions.length; ++i) {
        if (positions[i] === randomNumber) {
          isThere = true;
        }
      }

      if (!isThere) {
        positions.push(randomNumber);
      }
    }

    const _options = [];
    for (let i = 0; i < positions.length; ++i) {
      _options.push(options[positions[i]]);
    }

    return _options;
  }
}

export default new LearnModuleService();