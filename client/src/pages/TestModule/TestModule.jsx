import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTest, clearTestModule, getTestModule } from '../../redux/actions/testModuleAction';
import { useNavigate, useParams } from 'react-router-dom';
import { CardChoiceAnswer, TestWriteCard, CardWordsSelection, NavbarTest, ResultTestModule } from '../../components';
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
      <NavbarTest title={title} countCards={countCards} countUserAnsweredCards={countUserAnsweredCards}
        countCorrectUserAnswer={countCorrectUserAnswer} isShowResult={isShowResult} />
      
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
        {trueOrFalseCards && trueOrFalseCards.map((card, index) => {
          return <CardTrueFalse cardId={card.cardId} translate={card.translate} value={card.value}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} user={user} key={index}
            isUserAnswer={card.isUserAnswer} userAnswer={card.userAnswer} countCards={countCards}
            index={card.index} isShowResult={isShowResult} correctAnswer={card.correctAnswer}
            correctValue={card.correctValue} isCorrectUserAnswered={card.isCorrectUserAnswered}
            selected={card.selected} />
        })}

        {testCards && testCards.map((card, index) => {
          return <CardChoiceAnswer cardId={card.cardId} translate={card.translate} user={user} key={index}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} options={card.options}
            countCards={countCards} index={card.index} isCorrectUserSelected={card.isCorrectUserSelected}
            isShowResult={isShowResult} />
        })}

        {joinCards &&
          <CardWordsSelection cards={joinCards.cards} values={joinCards.values} user={user}
            countCards={countCards} isShowResult={isShowResult} />
        }

        {writeCards && writeCards.map((card, index) => {
          return <TestWriteCard cardId={card.cardId} translate={card.translate} user={user}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} key={index} isShowResult={isShowResult}
            countCards={countCards} index={card.index} userAnswer={card.userAnswer}
            isCorrectUserAnswered={card.isCorrectUserAnswered} correctValue={card.correctValue} />
        })}

        {!isShowResult &&
          <div className={style.footer}>
            <img src={testImage} alt='' />
            <p>Все готово! Отправить тест?</p>
            <button onClick={onClickCheckModule}>Оправить тест</button>
          </div>
        }
      </div>
    </div>
  );
}