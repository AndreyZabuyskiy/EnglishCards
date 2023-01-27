import StudyModule from "../models/StudyModule.js";
import Card from '../models/Card.js';
import { countGroupsByModuleSize } from '../helpers/countGroupsByModuleSize.js';

class TestModuleService {
  async getTestModule(userId, moduleId) {
    const module = await StudyModule.findById(moduleId);
    const cards = await Card.find({ module: moduleId });
    
    const testModule = {
      title: module.title,
      countCards: cards.length,
      groups: {
        trueOrFalseCards: [],
        testCards: [],
        joinCards: [],
        writeCards: []
      }
    }

    let countGroups = null;

    if (cards.length < 20) {
      countGroups = countGroupsByModuleSize[cards.length];
    } else {
      countGroups = countGroupsByModuleSize[20];
    }

    const freeCards = cards.slice(0);
    let randomNumberPositionCard = null;

    if (countGroups.TrueOrFalseCard > 0) {
      const trueOrFalseCards = [];

      for (let i = 0; i < countGroups.TrueOrFalseCard; ++i) {
        randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        const isTrueOrFalseRandom = this.getRandomNumber(0, 2);
        let value = '';

        if (isTrueOrFalseRandom) {
          value = card.value;
        } else {
          randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
          const rndCard = freeCards[randomNumberPositionCard];
          value = rndCard.value;
        }

        trueOrFalseCards.push({
          cardId: card._id,
          translate: card.translate,
          value: value,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        testModule.groups.trueOrFalseCards = trueOrFalseCards;
      }
    }

    if (countGroups.TestCards > 0) {
      const testCards = [];

      for (let i = 0; i < countGroups.TestCards; ++i) {
        randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        const optionsCard = [card.value];
        for (let j = 0; j < 3; ++j) {
          randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
          const rndCard = freeCards[randomNumberPositionCard];
          optionsCard.push(rndCard.value);
        }

        testCards.push({
          cardId: card._id,
          translate: card.translate,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage,
          options: optionsCard
        });

        testModule.groups.testCards = testCards;
      }
    }

    if (countGroups.JoinCards > 0) {
      const cards = [];
      const values = [];

      for (let i = 0; i < countGroups.JoinCards; ++i) {
        randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        cards.push({
          cardId: card._id,
          translate: card.translate,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        values.push(card.value);
      }
      
      testModule.groups.joinCards = {
        cards, values
      };
    }

    if (countGroups.WriteCards > 0) {
      const writeCards = [];

      for (let i = 0; i < countGroups.WriteCards; ++i) {
        randomNumberPositionCard = this.getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        writeCards.push({
          cardId: card._id,
          translate: card.translate,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        testModule.groups.writeCards = writeCards;
      }
    }

    return testModule;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default new TestModuleService();