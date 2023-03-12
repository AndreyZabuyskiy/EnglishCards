import style from './CardElement.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardElement = (props) => {
  let imgSrc = '';
  if (props.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${props.user.email}/${props.pathToFile}`;
  } else if (props.urlToImage) {
    imgSrc = `${props.urlToImage}`;
  }

  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.value}>{props.term}</div>
        <div className={style.card__translate}>
          <div className={style.definition}>{props.definition}</div>
          {imgSrc && <img src={`${imgSrc}`} className={style.card__img} alt='' />}
        </div>
      </div>
      <div className={style.actions__container}>
        <div className={style.actions}>
          <div className={style.action}>✰</div>
          <a className={style.middle__action}
            href={`https://dictionary.cambridge.org/dictionary/english/${props.term}`}
            target={"_blank"} rel="noopener noreferrer">
            🔈
          </a>
          <div className={style.action}>✎</div>
        </div>
      </div>
    </div>
  );
}