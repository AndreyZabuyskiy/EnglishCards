import style from './CardTrueFalse.module.css';
import { useDispatch } from 'react-redux';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { testSelectTrueOrFalseCard, testUnselectTrueOrFalseCard } from '../../redux/actions/testModuleAction';

export const CardTrueFalse = ({ cardId, translate, value, pathToFile, urlToImage, user, isUserAnswer, userAnswer, index, countCards, isShowResult, correctAnswer, correctValue, isCorrectUserAnswered, selected }) => {
  const dispatch = useDispatch();

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  const onClickSelectTrueOrFalse = (userAnswer) => {
    dispatch(testSelectTrueOrFalseCard(cardId, userAnswer));
  }

  const onClickUnselectTrueOrFalse = () => {
    dispatch(testUnselectTrueOrFalseCard(cardId));
  }

  return (
    <div className={style.card}>
      <div className={style.index}>{index} из {countCards}</div>
      <div className={style.content}>
        <div className={style.content__translate}>
          <div className={style.content__header}>Definition</div>
          <div className={style.translate}>
            <div>{translate}</div>
            {imgSrc && <img src={`${imgSrc}`} className={style.card__img} alt='' />}
          </div>
        </div>
        <div className={style.content__value}>
          <div className={style.content__header}>Term</div>
          <div className={style.value}>{ value }</div>
        </div>
      </div>
      <div className={style.footer}>
        {!isShowResult
          ?
          <>
            <div className={style.text}>Выбирите ответ</div>
              <div className={style.buttons}>
                <button onClick={() => isUserAnswer && userAnswer ? onClickUnselectTrueOrFalse()
                  : onClickSelectTrueOrFalse(true)}
                  className={`${style.left__button} ${isUserAnswer && userAnswer ? style.selected : ''}`}>
                  Correct
                </button>
                <button onClick={() => isUserAnswer && !userAnswer ? onClickUnselectTrueOrFalse()
                  : onClickSelectTrueOrFalse(false)}
                  className={`${style.right__button} ${isUserAnswer && !userAnswer ? style.selected : ''}`}>
                  Incorrect
                </button>
              </div>
          </>
          :
          <div>
            {isCorrectUserAnswered
              ? <div className={style.message__correct__answer}>Correct answer</div>
              : <div className={style.message__incorrect__answer}>Incorrect answer</div>
            }

            <div className={style.result__buttons}>
              <div className={`${style.left__button}
                ${userAnswer && correctAnswer ? style.correct__answer : ''}
                ${userAnswer && !correctAnswer ? style.incorrect__answer : ''}`}>
                Correct
              </div>
              <div className={`${style.right__button}
                ${!userAnswer && !correctAnswer ? style.correct__answer : ''}
                ${!userAnswer && correctAnswer ? style.incorrect__answer : ''}`}>Incorrect</div>
            </div>

            {!correctAnswer &&
            <>
              <div className={style.correct__user__answer__wrapper}>
                <p>Correct answer</p>
                <div className={style.correct__user__answer}>
                  <span>{correctValue}</span>
                </div>
              </div>
            </>
            }
          </div>
        }
      </div>
    </div>
  );
}