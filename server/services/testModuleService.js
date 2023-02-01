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

    let countGroups = [];

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

  async checkTest(moduleId, testModule) {
    let countCorrectUserAnswer = 0;
    let countIncorrectUserAnswer = 0;    
    const trueOrFalseCards = testModule.trueOrFalseCards;
    const testCards = testModule.testCards;
    const joinCards = testModule.joinCards;
    const writeCards = testModule.writeCards;

    const cards = await Card.find({ module: moduleId });

    const resultTrueOrFalseCards = [];
    trueOrFalseCards.forEach(trueFalseCard => {
      const card = cards.filter(c => c._id.toString() === trueFalseCard.cardId)[0];
      const correctAnswer = trueFalseCard.value === card.value;
      const isCorrectUserAnswered = trueFalseCard.userAnswer === correctAnswer;
      
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;

      const resultCard = {
        ...trueFalseCard,
        isCorrectUserAnswered,
        correctAnswer,
        correctValue: card.value
      }

      resultTrueOrFalseCards.push(resultCard);
    });

    const resultTestCards = [];
    testCards.forEach(testCard => {
      const card = cards.filter(c => c._id.toString() === testCard.cardId)[0];
      const resultOptions = [];

      testCard.options.forEach(option => {
        const isCorrectOption = option.value === card.value;
        const resultOption = {
          ...option,
          isCorrect: isCorrectOption
        };
        resultOptions.push(resultOption);
      });
      const correctOption = resultOptions.filter(opt => opt.isCorrect)[0];
      const isCorrectUserSelected = correctOption.selected;

      isCorrectUserSelected ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;

      const resultCard = {
        ...testCard,
        options: resultOptions,
        isCorrectUserSelected: correctOption.selected
      }

      resultTestCards.push(resultCard);
    });

    const resultJoinCards = [];
    joinCards.cards.forEach(joinCard => {
      const card = cards.filter(c => c._id.toString() === joinCard.cardId)[0];
      const isCorrectUserAnswered = joinCard.userAnswer === card.value;
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;

      const resultCard = {
        ...joinCard,
        isCorrectUserAnswered,
        correctValue: card.value
      }
      
      resultJoinCards.push(resultCard);
    });

    const resultWriteCards = [];
    writeCards.forEach(writeCard => {
      const card = cards.filter(c => c._id.toString() === writeCard.cardId)[0];
      const isCorrectUserAnswered = writeCard.userAnswer === card.value;
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;

      const resultCard = {
        ...writeCard,
        isCorrectUserAnswered,
        correctValue: card.value
      }

      resultWriteCards.push(resultCard);
    });

    const testResult = {
      countCorrectUserAnswer,
      countIncorrectUserAnswer,
      groups: {
        trueOrFalseCards: resultTrueOrFalseCards,
        testCards: resultTestCards,
        joinCards: resultJoinCards,
        writeCards: resultWriteCards,
      }
    }

    return { ...testResult };
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default new TestModuleService();