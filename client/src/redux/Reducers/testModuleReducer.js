import { GET_TEST_MODULE, MATCHING_CARD, REMOVE_MATCHING_CARD, TEST_SELECT_OPTION, TEST_SELECT_TRUE_OR_FALSE_CARD, TEST_UNSELECT_OPTION, TEST_UNSELECT_TRUE_OR_FALSE_CARD, TEST_WRITE_CARD_ANSWER } from "../types"

const initialState = {
  title: '',
  countCards: 0,
  trueOrFalseCards: null,
  testCards: null,
  joinCards: null,
  writeCards: null
}

export const testModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_MODULE:
      return {
        ...state,
        title: action.payload.title,
        countCards: action.payload.countCards,
        trueOrFalseCards: action.payload.trueOrFalseCards,
        testCards: action.payload.testCards,
        joinCards: action.payload.joinCards,
        writeCards: action.payload.writeCards,
      }
    
    case MATCHING_CARD: {
      const joinCards = matchingCard(state.joinCards, action.payload.selectValue, action.payload.indexCard);
      return {
        ...state,
        joinCards: joinCards
      }
    }
    
    case REMOVE_MATCHING_CARD: {
      const joinCards = removeMatchingCard(state.joinCards, action.payload);
      return {
        ...state,
        joinCards: joinCards
      }
    }
    
    case TEST_SELECT_OPTION: {
      const testCards = selectOption(state.testCards, action.payload.cardId, action.payload.indexOption);
      return {
        ...state,
        testCards: testCards
      }
    }
      
    case TEST_UNSELECT_OPTION: {
      const testCards = unselectOption(state.testCards, action.payload.cardId, action.payload.indexOption);
      return {
        ...state,
        testCards: testCards
      }
    }

    case TEST_SELECT_TRUE_OR_FALSE_CARD: {
      const trueOrFalseCards = selectTrueOrFalseCard(state.trueOrFalseCards, action.payload.cardId, action.payload.userAnswer);
      return {
        ...state,
        trueOrFalseCards
      }
    }
    
    case TEST_UNSELECT_TRUE_OR_FALSE_CARD: {
      const trueOrFalseCards = unselectTrueOrFalseCard(state.trueOrFalseCards, action.payload);
      return {
        ...state,
        trueOrFalseCards
      }
    }
    
    case TEST_WRITE_CARD_ANSWER: {
      const writeCards = writeCardAnswer(state.writeCards, action.payload.cardId, action.payload.userAnswer);
      return {
        ...state,
        writeCards
      }
    }
    
    default:
      return state;
  }
}

function matchingCard(joinCards, selectValue, indexCard) {
  let values = joinCards.values;
  const card = joinCards.cards[indexCard];

  if (card.selected) {
    const value = values[card.indexValue];
    const matchedValue = {
      value: value.value,
      selected: false
    }
    const valuesOne = values.slice(0, card.indexValue);
    const valuesTwo = values.slice(card.indexValue + 1);
    values = [...valuesOne, matchedValue, ...valuesTwo];
  }

  const matchedCard = {
    ...card,
    selected: true,
    userAnswer: selectValue.value.value,
    indexValue: selectValue.index
  };
  const cardsOne = joinCards.cards.slice(0, indexCard);
  const cardsTwo = joinCards.cards.slice(indexCard + 1);
  const cards = [...cardsOne, matchedCard, ...cardsTwo];
  
  const valuesOne = values.slice(0, selectValue.index);
  const valuesTwo = values.slice(selectValue.index + 1);
  const matchedValue = {
    value: selectValue.value.value,
    selected: true
  };
  values = [...valuesOne, matchedValue, ...valuesTwo];
  
  return {
    cards,
    values
  }
}

function removeMatchingCard(joinCards, indexCard) {
  const card = joinCards.cards[indexCard];

  const value = joinCards.values[card.indexValue];
  const matchedValue = {
    value: value.value,
    selected: false
  }

  const valuesOne = joinCards.values.slice(0, card.indexValue);
  const valuesTwo = joinCards.values.slice(card.indexValue + 1);
  const values = [...valuesOne, matchedValue, ...valuesTwo];
  const matchedCard = {
    ...card,
    selected: false,
    userAnswer: '',
    indexValue: null
  }

  const cardsOne = joinCards.cards.slice(0, indexCard);
  const cardsTwo = joinCards.cards.slice(indexCard + 1);
  const cards = [...cardsOne, matchedCard, ...cardsTwo];

  return {
    cards,
    values
  }
}

function selectOption(testCards, cardId, indexOption) {
  const cardIndex = testCards.findIndex(card => cardId === card.cardId);
  const card = testCards[cardIndex];

  const options = [];
  card.options.forEach((option, index) => {
    if (index === indexOption) {
      options.push({
        value: option.value,
        selected: true
      });
    } else {
      options.push({
        value: option.value,
        selected: false
      });
    }
  });

  const updatedCard = {
    ...card,
    userAnswer: card.options[indexOption].value,
    options
  }

  const cardsOne = testCards.slice(0, cardIndex);
  const cardsTwo = testCards.slice(cardIndex + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}

function unselectOption(testCards, cardId, indexOption) {
  const cardIndex = testCards.findIndex(card => cardId === card.cardId);
  const card = testCards[cardIndex];

  const options = [];
  card.options.forEach((option, index) => {
    options.push({
      value: option.value,
      selected: false
    });
  });

  const updatedCard = {
    ...card,
    userAnswer: card.options[indexOption].value,
    options
  }

  const cardsOne = testCards.slice(0, cardIndex);
  const cardsTwo = testCards.slice(cardIndex + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}

function selectTrueOrFalseCard(trueOrFalseCards, cardId, userAnswer) {
  const indexCard = trueOrFalseCards.findIndex(card => card.cardId === cardId);
  const card = trueOrFalseCards[indexCard];

  const updatedCard = {
    ...card,
    userAnswer: userAnswer,
    selected: true
  };

  const cardsOne = trueOrFalseCards.slice(0, indexCard);
  const cardsTwo = trueOrFalseCards.slice(indexCard + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}

function unselectTrueOrFalseCard(trueOrFalseCards, cardId) {
  const indexCard = trueOrFalseCards.findIndex(card => card.cardId === cardId);
  const card = trueOrFalseCards[indexCard];

  const updatedCard = {
    ...card,
    userAnswer: '',
    selected: false
  };

  const cardsOne = trueOrFalseCards.slice(0, indexCard);
  const cardsTwo = trueOrFalseCards.slice(indexCard + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}

function writeCardAnswer(writeCards, cardId, userAnswer) {
  const indexCard = writeCards.findIndex(card => card.cardId === cardId);
  const card = writeCards[indexCard];

  const updatedCard = {
    ...card,
    userAnswer: userAnswer
  }

  const cardsOne = writeCards.slice(0, indexCard);
  const cardsTwo = writeCards.slice(indexCard + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}