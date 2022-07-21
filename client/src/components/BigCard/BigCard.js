import style from './BigCard.module.css';

export const BigCard = (props) => {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <div className={style.card__header__left}>Определение</div>
        <div className={style.card__header__right}>Header content</div>
      </div>

      <div className={style.card__content}>
        <div className={style.card__content__left}> {props.value } </div>
        <div className={style.card__content__right}>
          <img className={style.card__img}
            src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
        </div>
      </div>

      <div className={style.card__footer}>
        <div className={style.card__footer__left} onClick={props.clickBack}>←</div>  
        <div className={style.card__footer__right} onClick={props.clickForward}>→</div>
      </div>
    </div>
  );
}