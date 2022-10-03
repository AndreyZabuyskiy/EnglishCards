import style from './CardElement.module.css';

export const CardElement = (props) => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.value}>{props.value}</div>
        <div className={style.card__translate}>
          <div className={style.translate}>{props.translate}</div>
          {props.imgUrl && <div>
            <img src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' 
              className={style.card__img} />
          </div>
          }
        </div>
      </div>
      <div className={style.actions__container}>
        <div className={style.actions}>
          <div className={style.action}>✰</div>
          <div className={style.middle__action}>🔈</div>
          <div className={style.action}>✎</div>
        </div>
      </div>
    </div>
  );
}