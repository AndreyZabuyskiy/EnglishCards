import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navbar, CardWriteAnswer, ModeControls, WriteEndView } from '../../components';
import { fetchLearnModule } from '../../redux/actions';
import { checkAnswer } from '../../redux/actions';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userAnswer, setUserAnswer] = useState('');

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const { module, cards, index, totalNumberCards, countCorrectAnswers,
    countIncorrectAnswers, countCheckAnswers } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  const handleChangeUserAnswer = e => {
    setUserAnswer(e.target.value);
  }

  const onClickAnswer = () => {
    dispatch(checkAnswer(cards[index]._id, userAnswer));
  }

  return (
    <>
      <Navbar />
      {cards &&
        <div className={style.container}>
          <div className={style.container__content}>
            <ModeControls totalNumberCards={totalNumberCards}
              countCorrectAnswers={countCorrectAnswers}
              countIncorrectAnswers={countIncorrectAnswers}
              countCheckAnswers={countCheckAnswers}
              cards={cards} />
            
            {cards[index]
              ? 
                <CardWriteAnswer user={user}
                  value={cards[index].card.value}
                  translate={cards[index].card.translate}
                  imgUrl={cards[index].card.imgUrl}
                  userAnswer={userAnswer}
                  setUserAnswer={handleChangeUserAnswer}
                  onClickAnswer={onClickAnswer} /> 
              :
                <WriteEndView />
            }
        </div>
      </div>
      }
    </>
  );
}