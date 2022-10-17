import { useState } from 'react';
import style from './BigCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const BigCard = (props) => {
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

  return (
    <div className={style.wrapper}>
      <div onClick={() => onClickCard()} className={cardStyle}>
        <div className={style.card__front}>
          <div className={style.card__header}>
            <div className={style.card__header__left}>Определение</div>
            <div className={style.card__header__right}>Header content</div>
          </div>

          {props.img ?
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

          <div className={style.card__footer}>
            <div className={style.card__footer__left} onClick={props.clickBack}>←</div>  
            <div className={style.card__footer__right} onClick={props.clickForward}>→</div>
          </div>
        </div>

        <div className={style.card__back}>
          <div className={style.card__header}>
            <div className={style.card__header__left}>Определение</div>
            <div className={style.card__header__right}>Header content</div>
          </div>

          <div className={style.card__content__text}>        
            { props.value }
          </div>

          <div className={style.card__footer}>
            <div className={style.card__footer__left} onClick={(e) => props.clickBack(e)}>←</div>  
            <div className={style.card__footer__right} onClick={(e) => props.clickForward(e)}>→</div>
          </div>
        </div>
      </div>
    </div>
  );
}