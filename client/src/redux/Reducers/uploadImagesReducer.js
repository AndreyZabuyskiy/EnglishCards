import { FETCH_IMAGES } from "../types";

const inititalState = { 
  images: []
}

export const uploadImagesReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return {
        ...state,
        images: action.data
      }

    default:
      return state;
  }
}