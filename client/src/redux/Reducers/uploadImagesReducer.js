import { CLEAR_IMAGES, FETCH_IMAGES } from "../types";

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
    
    case CLEAR_IMAGES:
      return {
        ...state,
        images: []
      }

    default:
      return state;
  }
}