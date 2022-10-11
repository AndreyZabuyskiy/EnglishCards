import style from './CardElement.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardElement = (props) => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.value}>{props.value}</div>
        <div className={style.card__translate}>
          <div className={style.translate}>{props.translate}</div>
          {props.imgUrl && <div>
            <img src={`${REACT_APP_API_URL}/user_557/5860c080-1217-4ea4-a953-533229f8fc4a.jpg`} 
              className={style.card__img} />
          </div>
          }
          <div>
            <img src={`${REACT_APP_API_URL}/user_557/5860c080-1217-4ea4-a953-533229f8fc4a.jpg`} 
              className={style.card__img} />
          </div>
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