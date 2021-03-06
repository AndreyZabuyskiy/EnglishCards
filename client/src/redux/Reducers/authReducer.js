import { REGISTER, LOGIN, CHECK_AUTH } from '../types';

const inititalState = {
  user: undefined
}

export const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: {
          id: action.data.id,
          login: action.data.login
        }
      }

    case LOGIN:
      return {
        ...state,
        user: {
          id: action.data.id,
          login: action.data.login
        }
      }

    case CHECK_AUTH: {
      return {
        ...state,
        user: {
          id: action.data.id,
          login: action.data.login
        }
      }
    }

    default:
      return state;
  }
}