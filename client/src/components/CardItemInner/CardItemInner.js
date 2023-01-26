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

  let imgSrc = '';
  if (props?.moduleData?.cards[cardItemIndex].pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${props.user.login}/${props?.moduleData?.cards[cardItemIndex].pathToFile}`;
  } else if (props?.moduleData?.cards[cardItemIndex].urlToImage) {
    imgSrc = `${props?.moduleData?.cards[cardItemIndex].urlToImage}`;
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
              <div className={style.card__header__column_1}>Word</div>
              <div className={style.card__header__column_2}>
                { cardItemIndex + 1 }/{ props.moduleData?.cards?.length }
              </div>
              <div className={style.card__header__column_3}>
                <span className={style.card__edit}>✎</span>
                <span>✰</span>
              </div>
            </div>

            <div className={style.card__front__content}>
              { props?.moduleData?.cards[cardItemIndex].value }
            </div>

            <div className={style.card__footer}>
              <div onClick={(e) => clickBack(e)}
                className={cardItemIndex === 0 ? `${style.card__footer__left} ${style.disabled}` : `${style.card__footer__left}`}>←</div>
              <div onClick={(e) => clickForward(e)} className={`${style.card__footer__right}`}>→</div>
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
              {props.pathToFile &&
            <div>
              <img src={`${REACT_APP_API_URL}/${props.user.login}/${props.pathToFile}`}
                className={style.card__img} />
            </div>
          }
          {props.urlToImage &&
            <div>
              <img src={`${props.urlToImage}`}
                className={style.card__img} />
            </div>
          }
            {props?.moduleData?.cards[cardItemIndex].pathToFile || props?.moduleData?.cards[cardItemIndex].urlToImage
              ?
                <div className={style.card__content__front}>
                  <div className={style.card__content__left}>
                    {props?.moduleData?.cards[cardItemIndex].translate}
                  </div>
                  <div className={style.card__content__right}>
                    {imgSrc &&
                      <div>
                        <img src={`${imgSrc}`} className={style.card__img} />
                      </div>
                    }
                  </div>
                </div>
              :
                <div className={style.card__content__text}>        
                  {props?.moduleData?.cards[cardItemIndex].translate}
                </div>
              }
            </div>

            <div className={style.card__footer}>
              <div onClick={(e) => clickBack(e)}
                className={cardItemIndex === 0 ? `${style.card__footer__left} ${style.disabled}` : `${style.card__footer__left}`}>←</div>
              <div onClick={(e) => clickForward(e)} className={`${style.card__footer__right}`}>→</div>
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

      <div className={style.line}></div>
    </div>
  );
}