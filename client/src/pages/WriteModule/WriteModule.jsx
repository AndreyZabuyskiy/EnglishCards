import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navbar, CardWriteAnswer, ModeControls, WriteEndView, FeedbackHeading } from '../../components';
import { fetchWriteModule, nextQuestion, saveUserAnswer, checkWriteCardAnswer } from '../../redux/actions/writeLearnModuleAction';
import style from './WriteModule.module.scss';

export const WriteModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userAnswer, setUserAnswer] = useState('');

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const { cards, index, totalNumberCards, countCorrectAnswers,
    countIncorrectAnswers, countCheckAnswers,
    isFinish, isCurrentAnswer, currentUserAnswer } = useSelector(state => {
    const { writeModuleReducer } = state;
    return writeModuleReducer;
    });
  
  console.log('cards -->', cards);
  
  useEffect(() => {
    dispatch(fetchWriteModule(id));
  }, []);

  const handleChangeUserAnswer = e => {
    setUserAnswer(e.target.value);
  }

  const onClickAnswer = () => {
    setUserAnswer('');
    dispatch(saveUserAnswer(userAnswer));
    dispatch(checkWriteCardAnswer(cards[index]._id, userAnswer));
  }

  const onClickNextQuestion = () => {
    dispatch(nextQuestion());
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
            
            {!isFinish
              ?
                isCurrentAnswer
                ?
                  <CardWriteAnswer user={user}
                    value={cards[index].card.value}
                    translate={cards[index].card.translate}
                    pathToFile={cards[index].card.pathToFile}
                    urlToImage={cards[index].card.urlToImage}
                    userAnswer={userAnswer}
                    setUserAnswer={handleChangeUserAnswer}
                    onClickAnswer={onClickAnswer} />
                :
                  <FeedbackHeading
                    translate={cards[index].card.translate}
                    value={cards[index].card.value}
                    userAnswer={currentUserAnswer}
                    onClickNextQuestion={onClickNextQuestion} />
              :
                <WriteEndView />
            }
        </div>
      </div>
      }
    </>
  );
}