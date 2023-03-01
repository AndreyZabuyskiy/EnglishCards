import style from './CardItemInner.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCREEN_CARDS } from '../../utils/consts';
import { StudiedCardsLine } from '../StudiedCardsLine';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import classNames from 'classnames';
import propTypes from 'prop-types';

export const CardItemInner = ({id, module, cards, user}) => {
  const [cardItemIndex, setCardItemIndex] = useState(0);
  const [isFrontCard, setIsFrontCard] = useState(true);

  let cardStyle = classNames(`${style.card}`, {
    [`${style.card__click}`]: isFrontCard
  });

  let imgSrc = '';
  if (cards[cardItemIndex].pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.email}/${cards[cardItemIndex].pathToFile}`;
  } else if (cards[cardItemIndex].urlToImage) {
    imgSrc = `${cards[cardItemIndex].urlToImage}`;
  }

  const onClickCard = () => {
    cardStyle = classNames(`${style.card}`, {
      [`${style.card__click}`]: isFrontCard
    });

    setIsFrontCard(!isFrontCard);
  }

  const clickBack = (e) => {
    if (cardItemIndex > 0) { 
      setIsFrontCard(false);
      setCardItemIndex(cardItemIndex - 1);
    }
    
    e.stopPropagation();
  }

  const clickForward = (e) => {
    if(cardItemIndex < cards.length - 1) { 
      setIsFrontCard(false);
      setCardItemIndex(cardItemIndex + 1);
    }
    
    e.stopPropagation();
  }

  return (
    <div className={style.card__item__container}>
      <StudiedCardsLine cardItemIndex={cardItemIndex} numberCards={cards.length} />
      
      <div className={style.wrapper__card}>
        <div className={cardStyle} onClick={() => onClickCard()}>
          <div className={style.card__front}>
            <div className={style.card__header}>
              <div className={style.card__header__column_1}>Word</div>
              <div className={style.card__header__column_2}>
                { cardItemIndex + 1 }/{ cards?.length }
              </div>
              <div className={style.card__header__column_3}>
                <span className={style.card__edit}>✎</span>
                <span>✰</span>
              </div>
            </div>

            <div className={style.card__front__content}>
              { cards[cardItemIndex].term }
            </div>

            <div className={style.card__footer}>
              <div onClick={(e) => clickBack(e)}
                className={classNames(`${style.card__footer__left}`, {
                  [`${style.disabled}`]: cardItemIndex === 0
                })}
              >
                ←
              </div>
              <div onClick={(e) => clickForward(e)} className={`${style.card__footer__right}`}>→</div>
            </div>
          </div>
          
          <div className={style.card__back}>
            <div className={style.card__header}>
              <div className={style.card__header__column_1}>Термин</div>
              <div className={style.card__header__column_2}>
                { cardItemIndex + 1 }/{ cards?.length }
              </div>
              <div className={style.card__header__column_3}>
                <span className={style.card__edit}>✎</span>
                <span>✰</span>
              </div>
            </div>

            <div className={style.card__back__content}>
              {imgSrc
                ?
                  <div className={style.card__content__front}>
                    <div className={style.card__content__left}>
                      {cards[cardItemIndex].definition}
                    </div>
                    <div className={style.card__content__right}>
                      { imgSrc && <img src={`${imgSrc}`} className={style.card__img} alt='' /> }
                    </div>
                  </div>
                :
                  <div className={style.card__content__text}>
                    {cards[cardItemIndex].definition}
                  </div>
              }
            </div>

            <div className={style.card__footer}>
              <div onClick={(e) => clickBack(e)}
                className={classNames(`${style.card__footer__left}`, {
                  [`${style.disabled}`]: cardItemIndex === 0
                })}
              >
                ←
              </div>
              <div onClick={(e) => clickForward(e)} className={`${style.card__footer__right}`}>
                →
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.cards__items__buttons}>
        <Link
          to={`${SCREEN_CARDS}/${id}`}
          className={style.link__screen__cards}
          moduleData={{ module, cards }}
          user={user}>
          🔗
        </Link>
      </div>

      <div className={style.line}></div>
    </div>
  );
}

CardItemInner.propTypes = {
  id: propTypes.string,
  module: propTypes.object,
  cards: propTypes.array,
  user: propTypes.object
}