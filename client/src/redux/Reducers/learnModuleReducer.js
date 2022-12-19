import { CHECK_ANSWER, FETCH_LEARN_MODULE, NEXT_QUESTION, REMOVE_LEARN_MODULE, SAVE_USER_ANSWER } from "../types";

const inititalState = {
  module: null,
  cards: null,
  index: 0,
  totalNumberCards: 0,
  countCorrectAnswers: 0,
  countIncorrectAnswers: 0,
  countCheckAnswers: 0,
  isFinish: false,
  isCurrentAnswer: true,
  currentUserAnswer: ''
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
        countIncorrectAnswers: action.data.incorrectAnswers,
        index: 0,
        isFinish: false,
        isCurrentAnswer: true,
      }
    
    case CHECK_ANSWER: {
      if (action.data) {
        return {
          ...state,
          index: state.index + 1,
          countCorrectAnswers: state.countCorrectAnswers + 1,
          countCheckAnswers: state.countCheckAnswers + 1,
          isFinish: !state.cards[state.index + 1],
        }
      } else {
        return {
          ...state,
          countIncorrectAnswers: state.countIncorrectAnswers + 1,
          countCheckAnswers: state.countCheckAnswers + 1,
          isFinish: !state.cards[state.index + 1],
          isCurrentAnswer: false
        }
      }
    }
    
    case SAVE_USER_ANSWER: {
      return {
        ...state,
        currentUserAnswer: action.data
      }
    }
      
    case NEXT_QUESTION: {
      return {
        ...state,
        index: state.index + 1,
        isCurrentAnswer: true
      }
    }

    default:
      return state;
  }
}