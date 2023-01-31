import style from "./CardWordsSelection.module.css";
import { REACT_APP_API_URL } from "../../http/baseUrl";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { matchingCard, removeMatchingCard } from "../../redux/actions/testModuleAction";

export const CardWordsSelection = ({ cards, values, user }) => {
  const dispatch = useDispatch();

  const [selectIndexCard, setSelectIndexCard] = useState(0);
  const [wasSelectedCard, setWasSelectedCard] = useState(false);

  const onClickMatchingButton = (e, indexCard) => {
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
      <div className={style.header}>
        <div>Вопрос для подбора</div>
        <div>Нажмите термин, подходящий определению</div>
      </div>
      <div className={style.content}>
        {cards && cards.map((card, index) => {
          let imgSrc = '';
          if (card.pathToFile) {
            imgSrc = `${REACT_APP_API_URL}/${user.login}/${card.pathToFile}`;
          } else if (card.urlToImage) {
            imgSrc = `${card.urlToImage}`;
          }

          const styleMatchingCard = `${style.matching}  ${card.selected ? style.card__selected : ''}`;

          return (
            <div className={style.single__card} key={index}>
              <div>
                <div onClick={(e) => onClickMatchingButton(e, index)}
                  className={`${styleMatchingCard} ${selectIndexCard === index ? style.matching__actual : ''}`}>
                  {!wasSelectedCard && selectIndexCard === index &&
                    <span>Выбирите из списка ниже</span>
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
          )
        })}
      </div>
      <div className={style.footer}>
        {values.map((value, index) => (
          value.selected
            ?
              <span key={index} className={style.selected__value}>
                { value.value }
              </span>
            :
              <button className={style.value} key={index}
                onClick={() => onClickValue({ value, index })}>
                { value.value }
              </button>
        ))}
      </div>
    </div>
  );
}