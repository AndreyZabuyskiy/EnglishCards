import style from './TestWriteCard.module.css';
import { useDispatch } from 'react-redux';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { answerWriteCard } from '../../redux/actions/testModuleAction';

export const TestWriteCard = ({ cardId, translate, pathToFile, urlToImage, user, countCards, index,
  userAnswer, isShowResult, isCorrectUserAnswered, correctValue }) => {
  const dispatch = useDispatch();

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  const changeInput = (e) => {
    dispatch(answerWriteCard(cardId, e.target.value));
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
        {isShowResult
          ?
          <>
            {isCorrectUserAnswered
              ?
              <>
                <div className={style.correct__user__answer__wrapper}>
                  <p>Отлично!</p>
                  <div className={style.correct__user__answer}>
                    <span>{userAnswer}</span>
                  </div>
                </div>
              </>
              :
              <>
                <div className={style.incorrect__user__answer__wrapper}>
                  <p>Неправильный ответ</p>
                  <div className={style.incorrect__user__answer}>
                    <span>{userAnswer}</span>
                  </div>
                </div>
                <div className={style.correct__user__answer__wrapper}>
                  <p>Правильный ответ</p>
                  <div className={style.correct__user__answer}>
                    <span>{correctValue}</span>
                  </div>
                </div>
              </>
            }
          </>
          :
          <>
            <div className={style.text}>Ваш ответ</div>
            <input type="text" placeholder='Введите ответ' value={userAnswer} onChange={changeInput}
              className={style.user__input} />
            <div className={style.next__button__wrapper}>
              <button>Далее</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}