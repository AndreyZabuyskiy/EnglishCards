import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FixedBannerLearnModule, LearnCard, LearnRoundResult, NavbarLearnModule } from '../../components';
import { fetchLearnModule, checkTestCard, fetchLearnCard, continueLearnCard, lastQuestion } from '../../redux/actions';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  const { isLearnModuleDone, isLearnRoundDone, round, resultRound } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  const { card, options, isIncorrectAnswer, isCorrectAnswer,
    optionSelectedUser } = useSelector(state => {
    const { learnCardReducer } = state;
    return learnCardReducer;
  });
  
  const { user } = useSelector(state => {
    const { authReducer } = state;
    return authReducer;
  });

  const onClickOption = (cardId, option) => {
    dispatch(checkTestCard(cardId, option, round._id));
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
                  <LearnCard roundId={round._id} card={card} user={user} options={options}
                  isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                  optionSelectedUser={optionSelectedUser} onClickOption={onClickOption} />
                :
                <LearnRoundResult round={resultRound.round} cards={resultRound.cards}
                  lengthModuleCards={resultRound.lengthModuleCards} />
              :
                <h1>LearnModule done</h1>
            }
          </div>
          
          {isIncorrectAnswer &&
            <FixedBannerLearnModule buttonMessage={'Продолжить'}
              onClickButton={onClickContinue} />
          }

          {isLearnRoundDone &&
            <FixedBannerLearnModule buttonMessage={`Перейти к раунду ${round.round + 1}`}
              onClickButton={onClickContinue} />
          }
        </div>
      }
    </>
  );
}