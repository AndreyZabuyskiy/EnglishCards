import { CONTINUE_LEARN_CARD, CORRECT_LEARN_CARD_ANSWER, FETCH_LEARN_CARD, INCORRECT_LEARN_CARD_ANSWER, USER_SELECTED_OPTION } from "../types";

const initialState = {
  card: null,
  options: [],
  optionSelectedUser: null,
  isCorrectAnswer: false,
  isIncorrectAnswer: false
}

export const learnCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_CARD:
      return {
        ...state,
        card: action.data.card,
        options: action.data.options,
        isCorrectAnswer: false,
        isIncorrectAnswer: false
      }
    
    case USER_SELECTED_OPTION:
      return {
        ...state,
        optionSelectedUser: action.data
      }
    
    case CORRECT_LEARN_CARD_ANSWER:
      return {
        ...state,
        isCorrectAnswer: true
      }
    
    case INCORRECT_LEARN_CARD_ANSWER:
      return {
        ...state,
        isIncorrectAnswer: true
      }
    
    case CONTINUE_LEARN_CARD: {
      return {
        ...state,
        isCorrectAnswer: false,
        isIncorrectAnswer: false
      }
    }
    
    default:
      return state;
  }
}