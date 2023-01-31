import style from './TestWriteCard.module.css';
import { useDispatch } from 'react-redux';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useState } from 'react';
import { answerWriteCard } from '../../redux/actions/testModuleAction';

export const TestWriteCard = ({ cardId, translate, pathToFile, urlToImage, user, countCards, index }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  const onClickNext = () => {
    dispatch(answerWriteCard(cardId, answer));
  }

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div>Определение</div>
        <div>{index} из {countCards}</div>
      </div>

      <div className={style.content}>
        <div className={style.value}>{ translate }</div>
        {imgSrc && <img src={`${imgSrc}`} className={style.img} alt='' />}
      </div>

      <div className={style.footer}>
        <div className={style.text}>Ваш ответ</div>
        <input type="text" placeholder='Введите ответ' value={answer}
          onChange={(e) => setAnswer(e.target.value)} />
        <div className={style.next__button__wrapper}>
          <button onClick={onClickNext}>Далее</button>
        </div>
      </div>
    </div>
  );
}