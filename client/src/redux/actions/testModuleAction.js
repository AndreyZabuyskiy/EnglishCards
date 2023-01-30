import { fetchTestModuleApi } from "../../http/testModule"
import { GET_TEST_MODULE, MATCHING_CARD, REMOVE_MATCHING_CARD, TEST_SELECT_OPTION, TEST_UNSELECT_OPTION } from "../types";

export function getTestModule(moduleId) {
  return async dispatch => {
    const response = await fetchTestModuleApi(moduleId);

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
        indexValue: null
      });
    });

    response.groups.joinCards.values.forEach(value => {
      joinCards.values.push({
        value: value,
        selected: false
      });
    });

    const testModule = {
      title: response.title,
      countCards: response.countCards,
      trueOrFalseCards: response.groups.trueOrFalseCards,
      testCards: testCards,
      joinCards: joinCards,
      writeCards: response.groups.writeCards
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