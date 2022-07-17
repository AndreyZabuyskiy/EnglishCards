import style from './CardElement.module.css';

export const CardElement = (props) => {
  return (
    <div className={style.card}>
      <div>{props.value}</div>
      <div className={style.card__translate}>{props.translate}</div>
      <div>
        <img
          src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' 
          className={style.card__img}
        />
      </div>
    </div>
  );
}