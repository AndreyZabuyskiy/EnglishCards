import style from './CardWriteAnswer.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardWriteAnswer = (props) => {
  let imgSrc = '';
  if (props.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${props.user.email}/${props.pathToFile}`;
  } else if (props.urlToImage) {
    imgSrc = `${props.urlToImage}`;
  }

  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.content__header}>
          <div className={style.translate}>{ props.translate }</div>
          <div className={style.UILink}>
            <button className={style.dont__know}>I don't know</button>
          </div>
        </div>
        {imgSrc &&
          <div className={style.img__container}>
            <img className={style.card__img} src={`${imgSrc}`} alt='' />
          </div>
        }
      </div>
      <div className={style.footer}>
        <div className={style.footer__input}>
          <input id="answer" className={style.text__input} type="text"
            value={props.userAnswer} onChange={props.setUserAnswer} />
          <label htmlFor="answer">Your answer</label>
        </div>
        <div className={style.answer__button}>
          <button onClick={props.onClickAnswer}>Answer</button>
        </div>
      </div>
    </div>
  );
}