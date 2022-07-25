import { useState } from 'react';
import style from './CardItemInner.module.css';
import { Link } from 'react-router-dom';
import { SCREEN_CARDS } from '../../utils/consts';

export const CardItemInner = (props) => {
  const [cardItemIndex, setCardItemIndex] = useState(0);

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
      <div className={style.cards__item}>
        { props.moduleData?.words?.[cardItemIndex].value }
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