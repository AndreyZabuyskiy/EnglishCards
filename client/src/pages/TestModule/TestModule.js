import style from './TestModule.module.css';
import { CardTrueFalse } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestModule } from '../../redux/actions/testModuleAction';
import { useParams } from 'react-router-dom';
import { authReducer } from '../../redux/Reducers/authReducer';
import { CardChoiceAnswer } from '../../components';
import { TestWriteCard } from '../../components';

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

  const { title, countCards, groups } = useSelector(state => {
    const { testModuleReducer } = state;
    return testModuleReducer;
  });

  console.log('TestModule groups -->', groups);
  
  return (
    <div className={style.container}>
      {groups && groups.trueOrFalseCards.map((card, index) => {
        return <CardTrueFalse key={index} translate={card.translate} value={card.value}
          pathToFile={card.pathToFile} urlToImage={card.urlToImage} user={user} />
      })}

      {groups && groups.testCards.map((card, index) => {
        return <CardChoiceAnswer key={index} translate={card.translate} user={user}
          pathToFile={card.pathToFile} urlToImage={card.urlToImage} options={card.options} />
      })}

      {groups && groups.writeCards.map((card, index) => {
        return <TestWriteCard />
      })}
    </div>
  );
}

/*
  <ListCardsTrueFalse />
  <ListCardChoiceAnswer />
  <ListCardWriteAnswer />
  <CardWordsSelection />
*/