import { CHECK_TEST_MODULE, CHECK_TEST_MODULE_LOAD, CLEAR_TEST_MODULE, GET_TEST_MODULE, MATCHING_CARD, REMOVE_MATCHING_CARD, TEST_SELECT_OPTION, TEST_SELECT_TRUE_OR_FALSE_CARD, TEST_UNSELECT_OPTION, TEST_UNSELECT_TRUE_OR_FALSE_CARD, TEST_WRITE_CARD_ANSWER } from "../types"

const initialState = {
  title: '',
  countCards: 0,
  trueOrFalseCards: null,
  testCards: null,
  joinCards: null,
  writeCards: null,
  isShowResult: false,
  listQuestions: [],
  countCorrectUserAnswer: 0,
  countIncorrectUserAnswer: 0
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
      const joinCards = matchingCard(state.joinCards, action.payload.selectTerm, action.payload.indexCard);
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
    
    case CHECK_TEST_MODULE_LOAD: {
      return {
        ...state,
        trueOrFalseCards: null,
        testCards: null,
        joinCards: null,
        writeCards: null
      }
    }
    
    case CHECK_TEST_MODULE: {
      return {
        ...state,
        isShowResult: true,
        trueOrFalseCards: action.payload.trueOrFalseCards,
        testCards: action.payload.testCards,
        joinCards: action.payload.joinCards,
        writeCards: action.payload.writeCards,
        listQuestions: action.payload.listQuestions,
        countCorrectUserAnswer: action.payload.countCorrectUserAnswer,
        countIncorrectUserAnswer: action.payload.countIncorrectUserAnswer,
      }
    }
    
    case CLEAR_TEST_MODULE: {
      return {
        title: '',
        countCards: 0,
        trueOrFalseCards: null,
        testCards: null,
        joinCards: null,
        writeCards: null,
        isShowResult: false,
        listQuestions: [],
        countCorrectUserAnswer: 0,
        countIncorrectUserAnswer: 0
      }
    }
    
    default:
      return state;
  }
}

function matchingCard(joinCards, selectTerm, indexCard) {
  let terms = joinCards.terms;
  const card = joinCards.cards[indexCard];

  if (card.selected) {
    const term = terms[card.indexTerm];
    const matchedValue = {
      value: term.term,
      selected: false
    }
    const termsOne = terms.slice(0, card.indexValue);
    const termsTwo = terms.slice(card.indexValue + 1);
    terms = [...termsOne, matchedValue, ...termsTwo];
  }

  const matchedCard = {
    ...card,
    selected: true,
    userAnswer: selectTerm.term.term,
    indexTerm: selectTerm.index,
    isUserAnswer: true
  };

  const cardsOne = joinCards.cards.slice(0, indexCard);
  const cardsTwo = joinCards.cards.slice(indexCard + 1);
  const cards = [...cardsOne, matchedCard, ...cardsTwo];
  
  const valuesOne = terms.slice(0, selectTerm.index);
  const valuesTwo = terms.slice(selectTerm.index + 1);
  const matchedValue = {
    term: selectTerm.term.term,
    selected: true
  };
  terms = [...valuesOne, matchedValue, ...valuesTwo];
  
  return { cards, terms }
}

function removeMatchingCard(joinCards, indexCard) {
  const card = joinCards.cards[indexCard];

  const term = joinCards.terms[card.indexTerm];
  const matchedValue = {
    term: term.term,
    selected: false
  }

  const termsOne = joinCards.terms.slice(0, card.indexTerm);
  const termsTwo = joinCards.terms.slice(card.indexTerm + 1);
  const terms = [...termsOne, matchedValue, ...termsTwo];

  const matchedCard = {
    ...card,
    selected: false,
    userAnswer: '',
    indexTerm: null,
    isUserAnswer: false
  }

  const cardsOne = joinCards.cards.slice(0, indexCard);
  const cardsTwo = joinCards.cards.slice(indexCard + 1);
  const cards = [...cardsOne, matchedCard, ...cardsTwo];

  return { cards, terms }
}

function selectOption(testCards, cardId, indexOption) {
  const cardIndex = testCards.findIndex(card => cardId === card.cardId);
  const card = testCards[cardIndex];

  const options = [];
  card.options.forEach((option, index) => {
    if (index === indexOption) {
      options.push({
        term: option.term,
        selected: true
      });
    } else {
      options.push({
        term: option.term,
        selected: false
      });
    }
  });

  const updatedCard = {
    ...card,
    userAnswer: card.options[indexOption].term,
    options,
    isUserAnswer: true
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
    options,
    isUserAnswer: false
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
    selected: true,
    isUserAnswer: true
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
    isUserAnswer: false
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
    userAnswer: userAnswer,
    isUserAnswer: userAnswer !== ''
  }

  const cardsOne = writeCards.slice(0, indexCard);
  const cardsTwo = writeCards.slice(indexCard + 1);
  const cards = [...cardsOne, updatedCard, ...cardsTwo];

  return cards;
}