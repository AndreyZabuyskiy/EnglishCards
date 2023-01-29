import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestModule } from '../../redux/actions/testModuleAction';
import { useParams } from 'react-router-dom';
import { CardChoiceAnswer, TestWriteCard } from '../../components';
import { CardWordsSelection } from '../../components';

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

  return (
    <div className={style.container}>
      {trueOrFalseCards && trueOrFalseCards.map((card, index) => {
        return <CardTrueFalse key={index} translate={card.translate} value={card.value}
          pathToFile={card.pathToFile} urlToImage={card.urlToImage} user={user} />
      })}

      {testCards && testCards.map((card, index) => {
        return <CardChoiceAnswer key={index} translate={card.translate} user={user}
          pathToFile={card.pathToFile} urlToImage={card.urlToImage} options={card.options} />
      })}

      {joinCards && 
        <CardWordsSelection cards={joinCards.cards} values={joinCards.values} user={user} />
      }

      {writeCards && writeCards.map((card, index) => {
        return <TestWriteCard key={index} translate={card.translate} user={user}
          pathToFile={card.pathToFile} urlToImage={card.urlToImage} />
      })}
    </div>
  );
}