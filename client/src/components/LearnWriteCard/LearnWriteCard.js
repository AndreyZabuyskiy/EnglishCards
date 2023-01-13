import style from './LearnWriteCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useState } from 'react';

export const LearnWriteCard = ({ card, user, onClickCheckAnswer, isIncorrectAnswer, isCorrectAnswer, correctAnswer, userAnswer, isUnknowAnswer, clickUnknowAnswer }) => {
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
    setAnswer(prev => '');
    onClickCheckAnswer(card._id, answer);
  }

  const onClickButtonUnknow = () => {
    setAnswer(prev => '');
    clickUnknowAnswer(card._id);
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
        {isIncorrectAnswer || isCorrectAnswer || isUnknowAnswer
          ?
            <div>
              {isCorrectAnswer &&
                <div>
                  <div className={style.message__correct__answer}>Супер</div>
                  <div className={style.correct__answer__block}>
                    <div className={style.tick}>✓</div>
                    <div className={style.correct__answer}>{correctAnswer}</div>
                  </div>
                </div>
              }

              {isIncorrectAnswer &&
                <div>
                  <div className={style.message__incorrect__answer}>
                    Не совсем верно, но вы делаете успехи!
                  </div>
                  <div className={style.incorrect__answer__block}>
                    <div className={style.cross}>✕</div>
                    <div className={style.user__answer}>{userAnswer}</div>
                  </div>

                  <div className={style.message__correct__answer}>Правильный ответ</div>
                  <div className={style.correct__answer__block}>
                    <div className={style.tick}>✓</div>
                    <div className={style.correct__answer}>{correctAnswer}</div>
                  </div>
                </div>
              }
            
              {isUnknowAnswer &&
                <div>
                  <div className={style.message__card}>Вернитесь к этому вопросу позже!</div>
                  <div className={style.unknow__answer__block}>
                    <div className={style.unknow__cross}>✕</div>
                    <div className={style.unknow__answer}>Пропущено</div>
                  </div>
                  
                  <div className={style.message__card}>Правильный ответ</div>
                  <div className={style.correct__answer__block}>
                    <div className={style.tick}>✓</div>
                    <div className={style.correct__answer}>{correctAnswer}</div>
                  </div>
                </div>
              }
            </div>
          :
            <>
              <p>Your answer</p>
              <input type='text' placeholder='Enter your answer' value={answer} onChange={onChangeAnswer} />
              <div className={style.footer__inputs}>
                <button onClick={onClickButtonUnknow} className={style.button__unknow}>I don't know</button>
                <button onClick={checkAnswer} className={style.button__answer}>Answer</button>
              </div>
            </>
        }
      </div>
    </div>
  );
}