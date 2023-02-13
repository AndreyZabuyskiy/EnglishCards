import style from "./CardWordsSelection.module.css";
import { REACT_APP_API_URL } from "../../http/baseUrl";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { matchingCard, removeMatchingCard } from "../../redux/actions/testModuleAction";
import classNames from 'classnames';
import propTypes from 'prop-types';
import React from "react";

export const CardWordsSelection = React.memo(({ cards, values, user, countCards, isShowResult }) => {
  const dispatch = useDispatch();

  const [selectIndexCard, setSelectIndexCard] = useState(0);
  const [wasSelectedCard, setWasSelectedCard] = useState(false);

  const minIndex = cards[0].index;
  const maxIndex = cards[cards.length - 1].index;

  const onClickMatchingButton = (indexCard) => {
    setSelectIndexCard(indexCard);
  }

  const onClickValue = (selectValue) => {
    dispatch(matchingCard(selectValue, selectIndexCard));
    setWasSelectedCard(true);

    let newSelectIndexCard = selectIndexCard + 1;
    let isFreeCards = false;

    for (let i = 0; i < values.length - 1; ++i) {
      if (newSelectIndexCard >= values.length) {
        newSelectIndexCard = 0;
      }

      if (cards[newSelectIndexCard].selected) {
        newSelectIndexCard++;
      } else {
        isFreeCards = true;
        break;
      }
    }

    if (isFreeCards) {
      setSelectIndexCard(newSelectIndexCard);
    } else {
      setSelectIndexCard(-1);
    }
  }

  const onClickRemoveMatchingCard = (indexCard) => {
    setSelectIndexCard(indexCard);
    dispatch(removeMatchingCard(indexCard));

    let isOneCardSelected = false;
    let iterator = indexCard + 1;

    for (let i = 0; i < cards.length - 1; ++i) {
      if (iterator >= values.length) {
        iterator = 0;
      }

      if (cards[iterator].selected) {
        isOneCardSelected = true;
        break;
      } else {
        iterator++;
      }
    }

    setWasSelectedCard(isOneCardSelected);
  }

  return (
    <div className={style.card}>
      <div className={style.index}>{minIndex}-{maxIndex} из {countCards}</div>
      <div className={style.header}>
        <div>Choice questions</div>
        <div>Click on a term that matches the definition</div>
      </div>
      <div className={style.content}>
        {cards && cards.map((card, index) => {
          let imgSrc = '';
          if (card.pathToFile) {
            imgSrc = `${REACT_APP_API_URL}/${user.login}/${card.pathToFile}`;
          } else if (card.urlToImage) {
            imgSrc = `${card.urlToImage}`;
          }

          return (
            <>
              {!isShowResult
                ?
                <div className={style.single__card} key={index}>
                  <div className={style.single__card__body}>
                    <div onClick={() => onClickMatchingButton(index)}
                      className={classNames(`${style.matching}`,
                        {
                          [`${style.card__selected}`]: card.selected
                        },
                        {
                          [`${style.matching__actual}`]: selectIndexCard === index
                        }
                      )}
                    >
                      {!wasSelectedCard && selectIndexCard === index &&
                        <span>Select from the list below</span>
                      }

                      {card.userAnswer &&
                        <div className={style.single__card__answer}>
                          <div>{card.userAnswer}</div>
                          <button onClick={() => onClickRemoveMatchingCard(index)}>🗙</button>
                        </div>
                      }
                    </div>
                  </div>
                  <div className={style.translate}>
                    <div>{ card.translate }</div>
                    {imgSrc && <img src={imgSrc} className={style.card__img} alt='' />}
                  </div>
                </div>
                :
                <div className={style.result__card}>
                  <div className={style.translate}>
                    <div>{ card.translate }</div>
                    {imgSrc && <img src={imgSrc} className={style.card__img} alt='' />}
                  </div>

                  {card.isCorrectUserAnswered
                    ?
                    <div className={style.correct__user__answer__wrapper}>
                      <p>Great!</p>
                      <div className={style.correct__user__answer}>
                        <span>{card.userAnswer}</span>
                      </div>
                    </div>
                    :
                    <div className={style.user__answer__wrapper}>
                      <p>Incorrect</p>
                      <div className={style.user__answer__body}>
                        <div className={style.incorrect__user__answer__wrapper}>
                        <div className={style.incorrect__user__answer}>
                          <span>{card.userAnswer}</span>
                        </div>
                      </div>
                      <div className={style.space__empty}></div>
                      <div className={style.correct__user__answer__wrapper}>
                        <div className={style.correct__user__answer}>
                          <span>{card.correctValue}</span>
                        </div>
                      </div>
                      </div>
                    </div>
                  }
                </div>
              }
            </>
          )
        })}
      </div>
      {!isShowResult &&
        <div className={style.footer}>
        {values.map((value, index) => (
          value.selected
            ?
            <span key={index} className={style.selected__value}>
              {value.value}
            </span>
            :
            <button className={style.value} key={index}
              onClick={() => onClickValue({ value, index })}>
              {value.value}
            </button>
        ))}
        </div>
      }
    </div>
  );
})

CardWordsSelection.propTypes = {
  cards: propTypes.array,
  values: propTypes.array,
  user: propTypes.object,
  countCards: propTypes.number,
  isShowResult: propTypes.bool
}