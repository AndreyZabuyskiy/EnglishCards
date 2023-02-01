import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTest, getTestModule } from '../../redux/actions/testModuleAction';
import { useParams } from 'react-router-dom';
import { CardChoiceAnswer, TestWriteCard, CardWordsSelection, NavbarTest, ResultTestModule } from '../../components';
import testImage from '../../assets/test-image.png'

export const TestModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTestModule(id));
  }, []);

  const { user } = useSelector(state => {
    const { authReducer } = state;
    return authReducer;
  });

  const { title, countCards, trueOrFalseCards, testCards, joinCards, writeCards,
    isShowResult } = useSelector(state => {
    const { testModuleReducer } = state;
    return testModuleReducer;
  });

  console.log('trueOrFalseCards -->', trueOrFalseCards);
  console.log('testCards -->', testCards);
  console.log('joinCards -->', joinCards);
  console.log('writeCards -->', writeCards);
  console.log('------------------------------------');

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

  return (
    <div className={style.container}>
      <NavbarTest title={title} countCards={countCards} countUserAnsweredCards={countUserAnsweredCards} />
      <div className={style.body}>
        {isShowResult && <ResultTestModule />}

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

        <div className={style.footer}>
          <img src={testImage} alt='' />
          <p>Все готово! Отправить тест?</p>
          <button onClick={onClickCheckModule}>Оправить тест</button>
        </div>
      </div>
    </div>
  );
}