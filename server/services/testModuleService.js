import StudyModule from "../models/StudyModule.js";
import Card from '../models/Card.js';
import { countGroupsByModuleSize } from '../helpers/countGroupsByModuleSize.js';
import { mixUpArray, getRandomNumber } from '../helpers/helpers.js';

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
        randomNumberPositionCard = getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        const isTrueOrFalseRandom = getRandomNumber(0, 2);
        let term = '';

        if (isTrueOrFalseRandom) {
          term = card.term;
        } else {
          randomNumberPositionCard = getRandomNumber(0, freeCards.length);
          const rndCard = freeCards[randomNumberPositionCard];
          term = rndCard.term;
        }

        trueOrFalseCards.push({
          cardId: card._id,
          definition: card.definition,
          term: term,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        testModule.groups.trueOrFalseCards = trueOrFalseCards;
      }
    }

    if (countGroups.TestCards > 0) {
      const testCards = [];

      for (let i = 0; i < countGroups.TestCards; ++i) {
        randomNumberPositionCard = getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        let optionsCard = [card.term];
        for (let j = 0; j < 3; ++j) {
          randomNumberPositionCard = getRandomNumber(0, freeCards.length);
          const rndCard = freeCards[randomNumberPositionCard];
          optionsCard.push(rndCard.term);
        }

        optionsCard = mixUpArray(optionsCard);

        testCards.push({
          cardId: card._id,
          definition: card.definition,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage,
          options: optionsCard
        });

        testModule.groups.testCards = testCards;
      }
    }

    if (countGroups.JoinCards > 0) {
      const cards = [];
      let terms = [];

      for (let i = 0; i < countGroups.JoinCards; ++i) {
        randomNumberPositionCard = getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        cards.push({
          cardId: card._id,
          definition: card.definition,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        terms.push(card.term);
      }

      terms = mixUpArray(terms);
      
      testModule.groups.joinCards = {
        cards, terms
      };
    }

    if (countGroups.WriteCards > 0) {
      const writeCards = [];

      for (let i = 0; i < countGroups.WriteCards; ++i) {
        randomNumberPositionCard = getRandomNumber(0, freeCards.length);
        const card = freeCards[randomNumberPositionCard];
        freeCards.splice(randomNumberPositionCard, 1);

        writeCards.push({
          cardId: card._id,
          definition: card.definition,
          pathToFile: card.pathToFile,
          urlToImage: card.urlToImage
        });

        testModule.groups.writeCards = writeCards;
      }
    }

    return testModule;
  }

  async checkTest(moduleId, testModule) {
    console.log('<-- checkTest -->');
    let countCorrectUserAnswer = 0;
    let countIncorrectUserAnswer = 0;
    const listQuestions = [];
    const trueOrFalseCards = testModule.trueOrFalseCards;
    const testCards = testModule.testCards;
    const joinCards = testModule.joinCards;
    const writeCards = testModule.writeCards;

    const cards = await Card.find({ module: moduleId });

    const resultTrueOrFalseCards = [];
    trueOrFalseCards.forEach(trueFalseCard => {
      const card = cards.filter(c => c._id.toString() === trueFalseCard.cardId)[0];
      const correctAnswer = trueFalseCard.term === card.term;
      const isCorrectUserAnswered = trueFalseCard.userAnswer === correctAnswer;
      
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;
      listQuestions.push(isCorrectUserAnswered);

      const resultCard = {
        ...trueFalseCard,
        isCorrectUserAnswered,
        correctAnswer,
        correctTerm: card.term
      }

      resultTrueOrFalseCards.push(resultCard);
    });

    const resultTestCards = [];
    testCards.forEach(testCard => {
      const card = cards.filter(c => c._id.toString() === testCard.cardId)[0];
      let resultOptions = [];

      testCard.options.forEach(option => {
        const isCorrectOption = option.term === card.term;
        const resultOption = {
          ...option,
          isCorrect: isCorrectOption
        };
        resultOptions.push(resultOption);
      });

      const correctOption = resultOptions.filter(opt => opt.isCorrect)[0];
      const isCorrectUserSelected = correctOption.selected;

      isCorrectUserSelected ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;
      listQuestions.push(isCorrectUserSelected);

      const resultCard = {
        ...testCard,
        options: resultOptions,
        isCorrectUserSelected: correctOption.selected
      }

      resultTestCards.push(resultCard);
    });

    const resultJoinCards = {
      cards: [],
      terms: []
    };

    joinCards.cards.forEach(joinCard => {
      const card = cards.filter(c => c._id.toString() === joinCard.cardId)[0];
      const isCorrectUserAnswered = joinCard.userAnswer === card.term;
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;
      listQuestions.push(isCorrectUserAnswered);

      const resultCard = {
        ...joinCard,
        isCorrectUserAnswered,
        correctTerm: card.term
      }
      
      resultJoinCards.cards.push(resultCard);
    });
    resultJoinCards.terms = joinCards.terms.slice(0);

    const resultWriteCards = [];
    writeCards.forEach(writeCard => {
      const card = cards.filter(c => c._id.toString() === writeCard.cardId)[0];
      const isCorrectUserAnswered = writeCard.userAnswer === card.term;
      isCorrectUserAnswered ? countCorrectUserAnswer++ : countIncorrectUserAnswer++;
      listQuestions.push(isCorrectUserAnswered);

      const resultCard = {
        ...writeCard,
        isCorrectUserAnswered,
        correctTerm: card.term
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
      },
      listQuestions
    }

    return { ...testResult };
  }
}

export default new TestModuleService();