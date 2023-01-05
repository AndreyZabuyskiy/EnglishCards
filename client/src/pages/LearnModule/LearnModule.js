import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LearnRoundResult, NavbarLearnModule } from '../../components';
import { LearnTestCard } from '../../components/LearnTestCard';
import { fetchLearnModule, checkTestCard, fetchLearnCard, continueLearnCard } from '../../redux/actions';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  const { learnModuleId, isLearnModuleDone, isLearnRoundDone, round, resultRound } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  const { card, options, isIncorrectAnswer, isCorrectAnswer,
    optionSelectedUser } = useSelector(state => {
    const { learnCardReducer } = state;
    return learnCardReducer;
    });
  
  console.log('LearnModule resultRound -->', resultRound);

  const onClickOption = (cardId, optionId) => {
    dispatch(checkTestCard(cardId, optionId, round._id));
  }

  const onClickContinue = () => {
    dispatch(continueLearnCard());
    dispatch(fetchLearnCard(round._id));
  }

  return (
    <>
      {round &&
        <div className={style.container}>
          <NavbarLearnModule round={round.round} totalNumberCards={round.totalNumberCards}
            passedCards={round.passedCards} />

          <div className={style.content}>
            {!isLearnModuleDone
              ?
                !isLearnRoundDone
                ?
                  <LearnTestCard roundId={round._id} card={card} options={options}
                  isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                  optionSelectedUser={optionSelectedUser} onClickOption={onClickOption} />
                :
                <LearnRoundResult round={resultRound.round} cards={resultRound.cards}
                  lengthModuleCards={resultRound.lengthModuleCards} />
              :
                <h1>LearnModule done</h1>
            }

            {/* <LearnTestCard /> */}
            {/* <LearnWriteCard /> */}
          </div>
          
          {isIncorrectAnswer &&
            <div className={style.message__continue__wrapper}>
              <div className={style.message__continue}>
                <div>Чтобы продолжить, нажмите любую клавишу</div>
                <button onClick={onClickContinue}>Продолжить</button>
              </div>
            </div>
          }
        </div>
      }
    </>
  );
}