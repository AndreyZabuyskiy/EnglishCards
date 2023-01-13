import { CLEAR_LEARN_CARD, CORRECT_LEARN_CARD_ANSWER, FETCH_LEARN_CARD, INCORRECT_LEARN_CARD_ANSWER, LOAD_CORRECT_ANSWER, USER_SELECTED_OPTION, CORRECT_LEARN_WRITE_CARD_ANSWER, INCORRECT_LEARN_WRITE_CARD_ANSWER, UNKNOW_LEARN_CARD } from "../types";

const initialState = {
  card: null,
  options: [],
  optionSelectedUser: null,
  isCorrectAnswer: false,
  isIncorrectAnswer: false,
  correctAnswer: null,
  userAnswer: null,
  isUnknowAnswer: false
}

export const learnCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARN_CARD:
      return {
        ...state,
        card: action.data.card,
        options: action.data.options,
        correctAnswer: action.data.value,
        optionSelectedUser: null,
        isCorrectAnswer: false,
        isIncorrectAnswer: false,
        isUnknowAnswer: false
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
    
    case CLEAR_LEARN_CARD:
      return {
        ...state,
        card: null,
        options: [],
        optionSelectedUser: null,
        isCorrectAnswer: false,
        isIncorrectAnswer: false,
        correctAnswer: null,
        userAnswer: null
      }
    
    case CORRECT_LEARN_WRITE_CARD_ANSWER:
      return {
        ...state,
        isCorrectAnswer: true,
        correctAnswer: action.data.correctAnswer,
        userAnswer: action.data.userAnswer
      }
    
    case INCORRECT_LEARN_WRITE_CARD_ANSWER:
      return {
        ...state,
        isIncorrectAnswer: true,
        correctAnswer: action.data.correctAnswer,
        userAnswer: action.data.userAnswer
      }
    
    case UNKNOW_LEARN_CARD: {
      return {
        ...state,
        isUnknowAnswer: true
      }
    }
    
    default:
      return state;
  }
}