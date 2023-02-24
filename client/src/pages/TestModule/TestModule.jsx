import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTest, clearTestModule, getTestModule } from '../../redux/actions/testModuleAction';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CardChoiceAnswer, TestWriteCard, CardWordsSelection, NavbarTest, ResultTestModule
} from '../../components';
import testImage from '../../assets/test-image.png'
import { LEARN_MODULE } from '../../utils/consts';

export const TestModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTestModule(id));
  }, []);

  const { user } = useSelector(state => {
    const { authReducer } = state;
    return authReducer;
  });

  const { title, countCards, trueOrFalseCards, testCards, joinCards, writeCards, isShowResult,
    listQuestions, countCorrectUserAnswer, countIncorrectUserAnswer } = useSelector(state => {
    const { testModuleReducer } = state;
    return testModuleReducer;
    });

  let countUserAnsweredCards = 0;
  countUserAnsweredCards += trueOrFalseCards?.filter(card => card.isUserAnswer).length;
  countUserAnsweredCards += testCards?.filter(card => card.isUserAnswer).length;
  countUserAnsweredCards += joinCards?.cards?.filter(card => card.isUserAnswer).length;
  countUserAnsweredCards += writeCards?.filter(card => card.isUserAnswer).length;

  const onClickCheckModule = () => {
    dispatch(checkTest(id, {
      title, countCards, trueOrFalseCards, testCards, joinCards, writeCards
    }));
  }

  const onClickMoveLearnModule = () => {
    dispatch(clearTestModule());
    navigate(`${LEARN_MODULE}/${id}`);
  }

  const onClickStartOverTest = () => {
    dispatch(clearTestModule());
    dispatch(getTestModule(id));
  }

  return (
    <div className={style.container}>
      <NavbarTest moduleId={id} title={title} countCards={countCards} isShowResult={isShowResult}
        countUserAnsweredCards={countUserAnsweredCards} countCorrectUserAnswer={countCorrectUserAnswer} />

      <div className={style.body}>
        {isShowResult &&
          <>
            <ResultTestModule countCorrectUserAnswer={countCorrectUserAnswer}
              countIncorrectUserAnswer={countIncorrectUserAnswer} onClickStartOverTest={onClickStartOverTest}
              onClickMoveLearnModule={onClickMoveLearnModule} />
            <div className={style.list__questions}>
              {listQuestions.map((question, index) => (
                <div className={style.item}>
                  {question
                    ? <div className={style.item__correct}>✓</div>
                    : <div className={style.item__incorrect}>✖</div>
                  }
                  <p>{index + 1}</p>
                </div>
              ))}
            </div>
          </>
        }
        
        {trueOrFalseCards && trueOrFalseCards.map((card) => (
          <CardTrueFalse {...card} user={user} key={card.cardId} countCards={countCards}
            isShowResult={isShowResult} />
        ))}

        {testCards && testCards.map((card) => (
          <CardChoiceAnswer {...card} user={user} key={card.cardId} countCards={countCards}
            isShowResult={isShowResult} />
        ))}

        {joinCards && joinCards.values.length > 0 && joinCards.cards.length > 0 &&
          <CardWordsSelection cards={joinCards.cards} values={joinCards.values} user={user}
            countCards={countCards} isShowResult={isShowResult} />
        }

        {writeCards && writeCards.map((card) => (
          <TestWriteCard {...card} user={user} key={card.cardId} isShowResult={isShowResult}
            countCards={countCards} />
        ))}

        {!isShowResult &&
          <div className={style.footer}>
            <img src={testImage} alt='' />
            <button onClick={onClickCheckModule}>Submit</button>
          </div>
        }
      </div>
    </div>
  );
}