import { fetchTestModuleApi } from "../../http/testModule"
import { GET_TEST_MODULE, MATCHING_CARD, REMOVE_MATCHING_CARD } from "../types";

export function getTestModule(moduleId) {
  return async dispatch => {
    const response = await fetchTestModuleApi(moduleId);

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
      testCards: response.groups.testCards,
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