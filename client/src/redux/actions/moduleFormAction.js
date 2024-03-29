import { createModuleApi, updateModuleApi, fetchImagesApi } from "../../http/moduleApi";
import { CREATE_MODULE, CREATE_MODULE_REDUCER_CLEAR, UPDATE_MODULE, FETCH_IMAGES, CLEAR_IMAGES } from "../types";

export function createModule(module) {
  return async dispatch => {
    let cards = [];

    for(let card in module.cards) {
      cards.push({
        term: module.cards[card].term,
        definition: module.cards[card].definition,
        pathToFile: module.cards[card].pathToFile,
        isUrlImage: module.cards[card].isUrlImage,
        urlToImage: module.cards[card].urlToImage,
        position: module.cards[card].position
      });
    }

    const createdModule = {
      title: module.title,
      description: module.description,
      cards
    }

    const response = await createModuleApi(createdModule);
    dispatch({
      type: CREATE_MODULE,
      data: response.data.module._id
    });
  }
}

export function clearCreateModuleReducer() {
  return async dispatch => {
    dispatch({
      type: CREATE_MODULE_REDUCER_CLEAR
    });
  }
}

export function updateModule(id, module) {
  return async dispatch => {
    let cards = [];

    for(let card in module.cards) {
      cards.push({
        term: module.cards[card].term,
        definition: module.cards[card].definition,
        pathToFile: module.cards[card].pathToFile,
        isUrlImage: module.cards[card].isUrlImage,
        urlToImage: module.cards[card].urlToImage,
        position: module.cards[card].position
      });
    }
    
    const createdModule = {
      title: module.title,
      description: module.description,
      cards
    }

    const response = await updateModuleApi(id, createdModule);

    dispatch({
      type: UPDATE_MODULE,
      data: response.data.module._id
    });
  }
}

export function fetchImages(searchQuery) {
  return async dispatch => {
    const response = await fetchImagesApi(searchQuery);

    dispatch({
      type: FETCH_IMAGES,
      data: response
    });
  }
}

export function clearImages() {
  return async dispatch => {
    dispatch({
      type: CLEAR_IMAGES
    });
  }
}