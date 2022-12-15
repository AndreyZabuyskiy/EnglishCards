import { CHECK_ANSWER, FETCH_LEARN_MODULE } from "../types";

const inititalState = {
  module: null,
  cards: null,
  index: 0,
  totalNumberCards: 0,
  countCorrectAnswers: 0,
  countIncorrectAnswers: 0,
  countCheckAnswers: 0
}

export const learnModuleReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_LEARN_MODULE:
      return {
        ...state,
        module: action.data.writeModule,
        cards: action.data.cards,
        totalNumberCards: action.data.countAnswers,
        countCorrectAnswers: action.data.correctAnswers,
        countIncorrectAnswers: action.data.incorrectAnswers
      }
    
    case CHECK_ANSWER: {
      if (action.data) {
        return {
          ...state,
          index: state.index + 1,
          countCorrectAnswers: state.countCorrectAnswers + 1,
          countCheckAnswers: state.countCheckAnswers + 1
        }
      } else {
        return {
          ...state,
          index: state.index + 1,
          countIncorrectAnswers: state.countIncorrectAnswers + 1,
          countCheckAnswers: state.countCheckAnswers + 1
        }
      }
    }

    default:
      return state;
  }
}