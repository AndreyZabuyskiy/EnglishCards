import style from './CardTrueFalse.module.css';
import { useDispatch } from 'react-redux';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { testSelectTrueOrFalseCard, testUnselectTrueOrFalseCard } from '../../redux/actions/testModuleAction';
import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

export const CardTrueFalse = React.memo(({ cardId, definition, term, pathToFile, urlToImage, user, isUserAnswer, userAnswer, index, countCards, isShowResult, correctAnswer, correctValue, isCorrectUserAnswered }) => {
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
            <div>{ definition }</div>
            {imgSrc && <img src={`${imgSrc}`} className={style.card__img} alt='' />}
          </div>
        </div>
        <div className={style.content__value}>
          <div className={style.content__header}>Term</div>
          <div className={style.value}>{term}</div>
        </div>
      </div>
      <div className={style.footer}>
        {!isShowResult
          ?
          <>
            <div className={style.text}>Choose the right option</div>
            <div className={style.buttons}>
              <button onClick={() => isUserAnswer && userAnswer
                ? onClickUnselectTrueOrFalse()
                : onClickSelectTrueOrFalse(true)}
                className={classNames(`${style.left__button}`, {
                  [`${style.selected}`]: isUserAnswer && userAnswer
                })}
              >
                Correct
              </button>
              <button onClick={() => isUserAnswer && !userAnswer
                ? onClickUnselectTrueOrFalse()
                : onClickSelectTrueOrFalse(false)}
                className={classNames(`${style.right__button}`, {
                  [`${style.selected}`]: isUserAnswer && !userAnswer
                })}
              >
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
              <div className={classNames(`${style.left__button}`,
                {
                  [`${style.correct__answer}`]: userAnswer && correctAnswer
                },
                {
                  [`${style.incorrect__answer}`]: userAnswer && !correctAnswer
                })}
              >
                Correct
              </div>
              <div className={classNames(`${style.right__button}`,
                {
                  [`${style.correct__answer}`]: !userAnswer && !correctAnswer
                },
                {
                  [`${style.incorrect__answer}`]: !userAnswer && correctAnswer
                })}
              >
                Incorrect
              </div>
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
})

CardTrueFalse.propTypes = {
  cardId: propTypes.string,
  definition: propTypes.string,
  term: propTypes.string,
  pathToFile: propTypes.string,
  urlToImage: propTypes.string,
  user: propTypes.object,
  isUserAnswer: propTypes.bool,
  userAnswer: propTypes.bool,
  index: propTypes.number,
  countCards: propTypes.number,
  isShowResult: propTypes.bool,
  correctAnswer: propTypes.bool,
  correctValue: propTypes.string,
  isCorrectUserAnswered: propTypes.bool
}