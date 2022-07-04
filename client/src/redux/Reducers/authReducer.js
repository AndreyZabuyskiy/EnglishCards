import { REGISTRATION, LOGIN } from '../types';

const inititalState = {
  isAuth: false,
  user: null
}

export const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case REGISTRATION:
      return { }

    case LOGIN:
      return { };

    default:
      return state;
  }
} 