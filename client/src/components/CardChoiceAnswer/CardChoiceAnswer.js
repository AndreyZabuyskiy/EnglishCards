import style from './CardChoiceAnswer.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const CardChoiceAnswer = ({ translate, options, pathToFile, urlToImage, user }) => {
  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  return (
    <div className={style.card}>
      <div className={style.header}>
        Определение
      </div>
      <div className={style.content}>
        <div className={style.value}>{ translate }</div>
        <div>
          {imgSrc && <div> <img src={`${imgSrc}`} className={style.img} /> </div>}
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.text}>Выбирите правильный термин</div>
        <div className={style.buttons}>
          <div className={style.buttoms__column__1}>
            <button>{ options[0] }</button>
            <button>{ options[1] }</button>
          </div>
          <div className={style.buttoms__column__2}>
            <button>{ options[2] }</button>
            <button>{ options[3] }</button>
          </div>
        </div>
      </div>
    </div>
  );
}