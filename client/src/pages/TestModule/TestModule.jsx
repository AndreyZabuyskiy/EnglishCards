import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkTest, getTestModule } from '../../redux/actions/testModuleAction';
import { useParams } from 'react-router-dom';
import { CardChoiceAnswer, TestWriteCard, CardWordsSelection, NavbarTest } from '../../components';
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

  const { title, countCards, trueOrFalseCards, testCards, joinCards, writeCards } = useSelector(state => {
    const { testModuleReducer } = state;
    return testModuleReducer;
  });

  const onClickCheckModule = () => {
    dispatch(checkTest({
      title, countCards, trueOrFalseCards, testCards, joinCards, writeCards
    }));
  }

  return (
    <div className={style.container}>
      <NavbarTest title={title} countCards={countCards} />
      <div className={style.body}>
        {trueOrFalseCards && trueOrFalseCards.map((card, index) => {
          return <CardTrueFalse cardId={card.cardId} translate={card.translate} value={card.value}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} user={user} key={index}
            selected={card.selected} userAnswer={card.userAnswer} countCards={countCards} index={card.index} />
        })}

        {testCards && testCards.map((card, index) => {
          return <CardChoiceAnswer cardId={card.cardId} translate={card.translate} user={user} key={index}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} options={card.options}
            countCards={countCards} index={card.index} />
        })}

        {joinCards && 
          <CardWordsSelection cards={joinCards.cards} values={joinCards.values} user={user}
            countCards={countCards} />
        }

        {writeCards && writeCards.map((card, index) => {
          return <TestWriteCard cardId={card.cardId} translate={card.translate} user={user}
            pathToFile={card.pathToFile} urlToImage={card.urlToImage} key={index}
            countCards={countCards} index={card.index}/>
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