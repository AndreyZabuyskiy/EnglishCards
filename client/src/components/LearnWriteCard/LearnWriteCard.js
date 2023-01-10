import style from './LearnWriteCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useState } from 'react';
import { checkLearnWriteCard } from '../../redux/actions';

export const LearnWriteCard = ({ card, user, onClickCheckAnswer }) => {
  const [answer, setAnswer] = useState('');

  let imgSrc = '';
  if (card?.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${card.pathToFile}`;
  } else if (card?.urlToImage) {
    imgSrc = `${card.urlToImage}`;
  }

  const onChangeAnswer = (e) => {
    setAnswer(prev => e.target.value);
  }

  const checkAnswer = () => {
    onClickCheckAnswer(card._id, answer);
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
        <input type='text' placeholder='Enter your answer' value={answer} onChange={onChangeAnswer} />
        <div className={style.footer__inputs}>
          <button className={style.button__unknow}>I don't know</button>
          <button onClick={checkAnswer} className={style.button__answer}>Answer</button>
        </div>
      </div>
    </div>
  );
}