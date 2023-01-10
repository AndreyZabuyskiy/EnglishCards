import style from './LearnWriteCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const LearnWriteCard = ({ card, user }) => {
  let imgSrc = '';
  if (card?.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${card.pathToFile}`;
  } else if (card?.urlToImage) {
    imgSrc = `${card.urlToImage}`;
  }

  return (
    <div>
      <div className={style.header}>
        <span>Definitions</span>
        <button>🔈</button>
      </div>
      <div className={style.content}>
        <p>{card.translate}</p>
        {imgSrc && <img src={`${imgSrc}`} className={style.image} /> }
      </div>
      <div className={style.footer}>
        <p>Your answer</p>
        <input type='text' placeholder='Enter your answer' />
        <div className={style.footer__inputs}>
          <button className={style.button__unknow}>I don't know</button>
          <button className={style.button__answer}>Answer</button>
        </div>
      </div>
    </div>
  );
}