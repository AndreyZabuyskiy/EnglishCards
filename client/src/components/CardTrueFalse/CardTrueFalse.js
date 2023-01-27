import style from './CardTrueFalse.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardTrueFalse = ({ translate, value, pathToFile, urlToImage, user }) => {
  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.content__translate}>
          <div className={style.content__header}>Определение</div>
          <div className={style.translate}>
            <div>{translate}</div>
            {imgSrc && <div> <img src={`${imgSrc}`} className={style.card__img} /> </div>}
          </div>
        </div>
        <div className={style.content__value}>
          <div className={style.content__header}>Термин</div>
          <div className={style.value}>{ value }</div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.text}>Выбирите ответ</div>
        <div className={style.buttons}>
          <button className={style.left__button}>Верно</button>
          <button className={style.right__button}>Неверно</button>
        </div>
      </div>
    </div>
  );
}