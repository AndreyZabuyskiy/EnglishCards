import { GET_TEST_MODULE } from "../types"

const initialState = {
  title: '',
  countCards: 0,
  groups: null
}

export const testModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_MODULE:
      return {
        ...state,
        title: action.payload.title,
        countCards: action.payload.countCards,
        groups: action.payload.groups
      }
    
    default:
      return state;
  }
}