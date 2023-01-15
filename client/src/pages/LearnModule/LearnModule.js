import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FixedBannerLearnModule, LearnCard, LearnRoundResult, NavbarLearnModule, ResultLearnModule } from '../../components';
import { fetchLearnModule, checkTestCard, checkLearnWriteCard, clearLearnCard, nextLearnQuestion, startOverLearnModule, unknowAnswer } from '../../redux/actions';
import { HOME_ROUTE } from '../../utils/consts';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  const { learnModuleId, isLearnModuleDone, isLearnRoundDone, round, resultRound } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  const { card, options, isIncorrectAnswer, isCorrectAnswer, optionSelectedUser,
    correctAnswer, userAnswer, isUnknowAnswer } = useSelector(state => {
    const { learnCardReducer } = state;
    return learnCardReducer;
  });
  
  const { user } = useSelector(state => {
    const { authReducer } = state;
    return authReducer;
  });

  const onClickOption = (cardId, option) => {
    dispatch(checkTestCard(cardId, option, round._id, learnModuleId));
  }

  const onClickContinue = () => {
    dispatch(nextLearnQuestion(round._id, learnModuleId));
  }

  const onClickCheckAnswer = (cardId, answer) => {
    dispatch(checkLearnWriteCard(answer, correctAnswer, cardId, round._id, learnModuleId));
  }

  const onClickNextRound = () => {
    dispatch(clearLearnCard());
    dispatch(fetchLearnModule(id));
  }

  const onClickStartOverLearnModule = () => {
    dispatch(startOverLearnModule(id));
  }

  const onClickExit = () => {
    navigate(`${HOME_ROUTE}/${id}`);
  }

  const clickUnknowAnswer = (cardId) => {
    dispatch(unknowAnswer(cardId));
  }

  const clickForm = () => {
    setIsShowMenu(false);
  }

  return (
    <>
      {round &&
        <div className={style.container} onClick={clickForm}>
          <NavbarLearnModule round={round.round} totalNumberCards={round.totalNumberCards}
            passedCards={round.passedCards} onClickExit={onClickExit} isLearnRoundDone={isLearnRoundDone}
            isLearnModuleDone={isLearnModuleDone} isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />

          <div className={style.content}>
            {!isLearnModuleDone
              ?
                !isLearnRoundDone
                  ?
                    <LearnCard roundId={round._id} card={card} user={user} options={options}
                      isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                      optionSelectedUser={optionSelectedUser} onClickOption={onClickOption}
                      onClickCheckAnswer={onClickCheckAnswer} correctAnswer={correctAnswer}
                      userAnswer={userAnswer} clickUnknowAnswer={clickUnknowAnswer}
                      isUnknowAnswer={isUnknowAnswer} />
                  :
                    <LearnRoundResult round={resultRound.round} cards={resultRound.cards}
                      lengthModuleCards={resultRound.lengthModuleCards}
                      countLearnedCards={resultRound.countLearnedCards} />
              :
                <ResultLearnModule onClickStartOverLearnModule={onClickStartOverLearnModule} />
            }
          </div>
          
          {isIncorrectAnswer &&
            <FixedBannerLearnModule buttonMessage={'Продолжить'}
              onClickButton={onClickContinue} />
          }

          {isUnknowAnswer &&
            <FixedBannerLearnModule buttonMessage={'Продолжить'}
              onClickButton={onClickContinue} />
          }

          {isLearnRoundDone &&
            <FixedBannerLearnModule buttonMessage={`Перейти к раунду ${round.round + 1}`}
              onClickButton={onClickNextRound} />
          }
        </div>
      }
    </>
  );
}