import style from './CardWriteAnswer.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardWriteAnswer = (props) => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.content__header}>
          <div className={style.translate}>{ props.translate }</div>
          <div className={style.UILink}>
            <button className={style.dont__know}>Не знаю</button>
          </div>
        </div>
        {props.imgUrl &&
          <div className={style.img__container}>
            <img className={style.card__img}
              src={`${REACT_APP_API_URL}/${props.user.login}/${props.imgUrl}`} />
          </div>
        }
      </div>
      <div className={style.footer}>
        <div className={style.footer__input}>
          <input id="answer" className={style.text__input} type="text"
            value={props.userAnswer} onChange={props.setUserAnswer} />
          <label htmlFor="answer">Ваш ответ</label>
        </div>
        <div className={style.answer__button}>
          <button onClick={props.onClickAnswer}>Ответ</button>
        </div>
      </div>
    </div>
  );
}