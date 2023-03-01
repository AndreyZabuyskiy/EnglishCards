import { useState } from 'react';
import style from './BigCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import classNames from 'classnames';

export const BigCard = (props) => {
  const [isFrontCard, setIsFrontCard] = useState(true);

  let imgSrc = '';
  if (props.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${props.user.login}/${props.pathToFile}`;
  } else if (props.urlToImage) {
    imgSrc = `${props.urlToImage}`;
  }

  let cardStyle = classNames(`${style.card}`, {
    [`${style.card__click}`]: isFrontCard
  });

  const onClickCard = () => {
    cardStyle = classNames(`${style.card}`, {
      [`${style.card__click}`]: isFrontCard
    });

    setIsFrontCard(!isFrontCard);
  }

  return (
    <div className={style.wrapper}>
      <div onClick={() => onClickCard()} className={cardStyle}>
        <div className={style.card__front}>
          <div className={style.card__header}>
            <div className={style.card__header__left}>Definition</div>
            <div className={style.card__header__right}>Header content</div>
          </div>

          {imgSrc
            ? <div className={style.card__content__front}>
                <div className={style.card__content__left}> { props.definition } </div>
                <div className={style.card__content__right}>
                  <img src={`${imgSrc}`} className={style.card__img} alt='' />
                </div>
              </div>
            : <div className={style.card__content__text}>
                { props.definition }
              </div>
          }

          <div className={style.card__footer}>
            <div className={style.card__footer__left} onClick={props.clickBack}>←</div>  
            <div className={style.card__footer__right} onClick={props.clickForward}>→</div>
          </div>
        </div>

        <div className={style.card__back}>
          <div className={style.card__header}>
            <div className={style.card__header__left}>Definition</div>
            <div className={style.card__header__right}>Header content</div>
          </div>

          <div className={style.card__content__text}>        
            { props.term }
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