import style from './CardItemInner.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCREEN_CARDS } from '../../utils/consts';
import { StudiedCardsLine } from '../StudiedCardsLine';
import { REACT_APP_API_URL } from '../../http/baseUrl';

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

  const clickBack = (e) => {
    if(cardItemIndex > 0) { 
      setCardItemIndex(cardItemIndex - 1);
    }
    
    e.stopPropagation();
  }

  const clickForward = (e) => {
    if(cardItemIndex < props.moduleData.cards.length - 1) {
      setCardItemIndex(cardItemIndex + 1);
    }
    
    e.stopPropagation();
  }

  return (
    <div className={style.card__item__container}>

      <StudiedCardsLine cardItemIndex={cardItemIndex} numberCards={props?.moduleData?.cards.length} />
      
      <div className={style.wrapper__card}>
        <div className={cardStyle} onClick={() => onClickCard()}>
          <div className={style.card__front}>
            <div className={style.card__header}>
              <div className={style.card__header__column_1}>Термин</div>
              <div className={style.card__header__column_2}>
                { cardItemIndex + 1 }/{ props.moduleData?.cards?.length }
              </div>
              <div className={style.card__header__column_3}>
                <span className={style.card__edit}>✎</span>
                <span>✰</span>
              </div>
            </div>
            <div className={style.card__front__content}>
              { props.moduleData?.cards?.[cardItemIndex].value }
            </div>
            <div className={style.card__footer}>
              <div className={style.card__footer__left} onClick={(e) => clickBack(e)}>←</div>
              <div className={style.card__footer__right} onClick={(e) => clickForward(e)}>→</div>
            </div>
          </div>
          <div className={style.card__back}>
            <div className={style.card__header}>
              <div className={style.card__header__column_1}>Термин</div>
              <div className={style.card__header__column_2}>
                { cardItemIndex + 1 }/{ props.moduleData?.cards?.length }
              </div>
              <div className={style.card__header__column_3}>
                <span className={style.card__edit}>✎</span>
                <span>✰</span>
              </div>
            </div>
            <div className={style.card__back__content}>
              {props.imgUrl ?
                <div className={style.card__content__front}>
                  <div className={style.card__content__left}> { props.translate } </div>
                  <div className={style.card__content__right}>
                    <img src={`${REACT_APP_API_URL}/${props.user.login}/${props.img}`}
                      className={style.card__img} />
                  </div>
                </div>
                :
                <div className={style.card__content__text}>        
                  { props.translate }
                </div>
              }
            </div>
            <div className={style.card__footer}>
              <div className={style.card__footer__left} onClick={(e) => clickBack(e)}>←</div>
              <div className={style.card__footer__right} onClick={(e) => clickForward(e)}>→</div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.cards__items__buttons}>
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