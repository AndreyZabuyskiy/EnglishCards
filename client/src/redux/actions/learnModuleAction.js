import { FETCH_LEARN_CARD, USER_SELECTED_OPTION, CORRECT_LEARN_CARD_ANSWER, INCORRECT_LEARN_CARD_ANSWER,
  FETCH_LEARN_ROUND, LEARN_MODULE_DONE, LEARN_ROUND_DONE, CORRECT_LEARN_WRITE_CARD_ANSWER, CLEAR_LEARN_CARD,
  INCORRECT_LEARN_WRITE_CARD_ANSWER, START_OVER_LEARN_MODULE, FETCH_LEARN_MODULE, UNKNOW_LEARN_CARD
} from "../types";
import { fetchLearnCardApi, checkTestCardApi, fetchLearnRoundById, completionCheckModuleApi, getResultRoundApi,
  createLearnRoundApi, checkLearnWriteCardApi, deleteLearnModuleByIdApi, fetchLearnModuleApi,
  fetchLearnRoundByModuleIddApi
} from "../../http/learnModuleApi";
  
export function fetchLearnModule(id) {
  return async dispatch => {
    const learnModule = await fetchLearnModuleApi(id);
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: learnModule._id
    });
    
    const round = await fetchLearnRoundByModuleIddApi(learnModule._id);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });
    
    if (round.passedCards >= round.totalNumberCards) {
      const resultRound = await getResultRoundApi(round._id);
    
      dispatch({
        type: LEARN_ROUND_DONE,
        data: resultRound
      });
    } else {
      try {
        const { learnCard, options } = await fetchLearnCardApi(round._id);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      } catch (exp) {
        console.log('fetchLearnModule exp.message', exp.message);
      }
    }
  }
}

export function fetchLearnCard(id) {
  return async dispatch => {
    const { learnCard, options } = await fetchLearnCardApi(id);
    
    dispatch({
      type: FETCH_LEARN_CARD,
      data: {
        card: learnCard,
        options: options,
        value: learnCard.value
      }
    });
  }
}

export function checkTestCard(cardId, option, roundId, learnModuleId) {
  return async dispatch => {
    dispatch({
      type: USER_SELECTED_OPTION,
      data: option._id
    });

    if (option.isRight) {
      dispatch({
        type: CORRECT_LEARN_CARD_ANSWER
      });
    } else {
      dispatch({
        type: INCORRECT_LEARN_CARD_ANSWER
      });
    }

    await checkTestCardApi(cardId, option._id, roundId);

    if (option.isRight) {
      const round = await fetchLearnRoundById(roundId);
      dispatch({
        type: FETCH_LEARN_ROUND,
        data: round
      });

      if (round.passedCards >= round.totalNumberCards) {
        const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);
        
        if (isLearnModuleDone) {
          dispatch({
            type: LEARN_MODULE_DONE
          });
        } else {
          const resultRound = await getResultRoundApi(roundId);

          dispatch({
            type: LEARN_ROUND_DONE,
            data: resultRound
          });

          await createLearnRoundApi(learnModuleId);
        }
      } else {
        const { learnCard, options } = await fetchLearnCardApi(roundId);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      }
    }
  }
}

export function checkLearnWriteCard(answer, correctAnswer, cardId, roundId, learnModuleId) {
  return async dispatch => {
    const isCorrectAnswer = answer === correctAnswer;
    
    if (isCorrectAnswer) {
      dispatch({
        type: CORRECT_LEARN_WRITE_CARD_ANSWER,
        data: { correctAnswer, userAnswer: answer }
      });
    } else {
      dispatch({
        type: INCORRECT_LEARN_WRITE_CARD_ANSWER,
        data: { correctAnswer, userAnswer: answer }
      });
    }

    await checkLearnWriteCardApi(cardId, isCorrectAnswer);

    if (isCorrectAnswer) {
      const round = await fetchLearnRoundById(roundId);
      dispatch({
        type: FETCH_LEARN_ROUND,
        data: round
      });

      if (round.passedCards >= round.totalNumberCards) {
        const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);

        if (isLearnModuleDone) {
          dispatch({
            type: LEARN_MODULE_DONE
          });

          await deleteLearnModuleByIdApi(learnModuleId);
        } else {
          const resultRound = await getResultRoundApi(roundId);
          dispatch({
            type: LEARN_ROUND_DONE,
            data: resultRound
          });

          await createLearnRoundApi(learnModuleId);
        }
      } else {
        const { learnCard, options } = await fetchLearnCardApi(roundId);
        
        dispatch({
          type: FETCH_LEARN_CARD,
          data: {
            card: learnCard,
            options: options,
            value: learnCard.value
          }
        });
      }
    }
  }
}

export function clearLearnCard() {
  return dispatch => {
    dispatch({
      type: CLEAR_LEARN_CARD
    });
  }
}

export function nextLearnQuestion(roundId, learnModuleId) {
  return async dispatch => {
    const round = await fetchLearnRoundById(roundId);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });

    if (round.passedCards >= round.totalNumberCards) {
      const isLearnModuleDone = await completionCheckModuleApi(learnModuleId);

      if (isLearnModuleDone) {
        dispatch({
          type: LEARN_MODULE_DONE
        });
      } else {
        const resultRound = await getResultRoundApi(roundId);

        dispatch({
          type: LEARN_ROUND_DONE,
          data: resultRound
        });

        await createLearnRoundApi(learnModuleId);
      }
    } else {
      const { learnCard, options } = await fetchLearnCardApi(roundId);
      dispatch({
        type: FETCH_LEARN_CARD,
        data: {
          card: learnCard,
          options: options,
          value: learnCard.value
        }
      });
    }
  }
}

export function startOverLearnModule(moduleId) {
  return async dispatch => {
    dispatch({
      type: START_OVER_LEARN_MODULE
    });
    
    const learnModule = await fetchLearnModuleApi(moduleId);
    dispatch({
      type: FETCH_LEARN_MODULE,
      data: learnModule._id
    });
    
    const round = await fetchLearnRoundByModuleIddApi(learnModule._id);
    dispatch({
      type: FETCH_LEARN_ROUND,
      data: round
    });

    const { learnCard, options } = await fetchLearnCardApi(round._id);

    dispatch({
      type: FETCH_LEARN_CARD,
      data: {
        card: learnCard,
        options: options,
        value: learnCard.value
      }
    });
  }
}

export function unknowAnswer(cardId) {
  return async dispatch => {
    dispatch({
      type: UNKNOW_LEARN_CARD
    });

    await checkLearnWriteCardApi(cardId, false);
  }
}