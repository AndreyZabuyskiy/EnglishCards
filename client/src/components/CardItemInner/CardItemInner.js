import { useState } from 'react';
import style from './CardItemInner.module.css';
import { Link } from 'react-router-dom';
import { SCREEN_CARDS } from '../../utils/consts';

export const CardItemInner = (props) => {
  const [cardItemIndex, setCardItemIndex] = useState(0);
  const [isFrontCard, setIsFrontCard] = useState(true);

  let cardStyle = undefined;

  if(isFrontCard){
    cardStyle = `${style.card}`;
  } else {
    cardStyle = `${style.card} ${style.card__click}`;
  }

  const onClickCard = () => {
    if(isFrontCard){
      cardStyle = `${style.card}`;
    } else {
      cardStyle = `${style.card} ${style.card__click}`;
    }

    setIsFrontCard(!isFrontCard);
  }

  const clickBack = () => {
    if(cardItemIndex > 0) { 
      setCardItemIndex(cardItemIndex - 1);
    }
  }

  const clickForward = () => {
    if(cardItemIndex < props.moduleData.words.length - 1) {
      setCardItemIndex(cardItemIndex + 1);
    }
  }

  return (
    <div className={style.card__item__container}>
      <div className={style.wrapper__card}>
        <div className={cardStyle} onClick={() => onClickCard()}>
          <div className={style.card__front}>
            { props.moduleData?.words?.[cardItemIndex].value }
          </div>
          <div className={style.card__back}>
            <div>{ props.moduleData?.words?.[cardItemIndex].translate }</div>
            <div>
              <img className={style.card__img}
                src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
            </div>
          </div>
        </div>
      </div>

      <div className={style.cards__items__buttons}>
        <button className={style.button__card__item} onClick={() => clickBack()}> ← </button>
        <div className={ style.counter__cards } >
          { cardItemIndex + 1 }/{ props.moduleData?.words?.length }
        </div>
        <button className={style.button__card__item} onClick={() => clickForward()}> → </button>

        <Link
          to={`${SCREEN_CARDS}/${props.id}`}
          className={style.link__screen__cards}
          moduleData={props.moduleData}
          user={props.user}>
          🔗
        </Link>
      </div>
    </div>
  );
}