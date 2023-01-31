import { checkTestModuleApi, fetchTestModuleApi } from "../../http/testModuleApi"
import { CHECK_TEST_MODULE, GET_TEST_MODULE, MATCHING_CARD, REMOVE_MATCHING_CARD, TEST_SELECT_OPTION, TEST_SELECT_TRUE_OR_FALSE_CARD, TEST_UNSELECT_OPTION, TEST_UNSELECT_TRUE_OR_FALSE_CARD, TEST_WRITE_CARD_ANSWER } from "../types";

export function getTestModule(moduleId) {
  return async dispatch => {
    const response = await fetchTestModuleApi(moduleId);
    let index = 1;

    const trueOrFalseCards = [];
    response.groups.trueOrFalseCards.forEach(card => {
      trueOrFalseCards.push({
        ...card,
        index: index++,
        userAnswer: false,
        selected: false
      });
    });

    const testCards = [];
    response.groups.testCards.forEach(card => {
      const options = [];
      card.options.forEach(option => {
        options.push({
          value: option,
          selected: false
        });
      });

      testCards.push({
        ...card,
        index: index++,
        userAnswer: '',
        options
      });
    });

    const joinCards = {
      cards: [],
      values: []
    }

    response.groups.joinCards.cards.forEach(card => {
      joinCards.cards.push({
        cardId: card.cardId,
        translate: card.translate,
        pathToFile: card.pathToFile,
        urlToImage: card.urlToImage,
        selected: false,
        userAnswer: '',
        indexValue: null,
        index: index++,
      });
    });

    response.groups.joinCards.values.forEach(value => {
      joinCards.values.push({
        value: value,
        selected: false
      });
    });

    const writeCards = [];
    response.groups.writeCards.forEach(card => {
      writeCards.push({
        ...card,
        index: index++,
        userAnswer: ''
      });
    });

    const testModule = {
      title: response.title,
      countCards: response.countCards,
      trueOrFalseCards: trueOrFalseCards,
      testCards: testCards,
      joinCards: joinCards,
      writeCards: writeCards
    }
    
    dispatch({
      type: GET_TEST_MODULE,
      payload: testModule
    });
  }
}

export function matchingCard(selectValue, indexCard) {
  return async dispatch => {
    dispatch({
      type: MATCHING_CARD,
      payload: {
        selectValue,
        indexCard
      }
    });
  }
}

export function removeMatchingCard(indexCard) {
  return async dispatch => {
    dispatch({
      type: REMOVE_MATCHING_CARD,
      payload: indexCard
    });
  }
}

export function testSelectOption(cardId, indexOption) {
  return async dispatch => {
    dispatch({
      type: TEST_SELECT_OPTION,
      payload: {
        cardId, indexOption
      }
    });
  }
}

export function testUnselectOption(cardId, indexOption) {
  return async dispatch => {
    dispatch({
      type: TEST_UNSELECT_OPTION,
      payload: {
        cardId, indexOption
      }
    });
  }
}

export function testSelectTrueOrFalseCard(cardId, userAnswer) {
  return async dispatch => {
    dispatch({
      type: TEST_SELECT_TRUE_OR_FALSE_CARD,
      payload: {
        cardId, userAnswer
      }
    });
  }
}

export function testUnselectTrueOrFalseCard(cardId) {
  return async dispatch => {
    dispatch({
      type: TEST_UNSELECT_TRUE_OR_FALSE_CARD,
      payload: cardId
    });
  }
}

export function answerWriteCard(cardId, userAnswer) {
  return async dispatch => {
    dispatch({
      type: TEST_WRITE_CARD_ANSWER,
      payload: {
        cardId, userAnswer
      }
    });
  }
}

export function checkTest(module) {
  return async dispatch => {
    const response = await checkTestModuleApi(module);

    dispatch({
      type: CHECK_TEST_MODULE
    });
  }
}