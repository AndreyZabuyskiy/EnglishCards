import { REGISTER, LOGIN, CHECK_AUTH, LOGOUT } from '../types';

const initialState = {
  user: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: action.data
      }

    case LOGIN:
      return {
        ...state,
        user: action.data
      }
      
    case LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    
    case CHECK_AUTH: {
      return {
        ...state,
        user: action.data
      }
    }

    default:
      return state;
  }
}