import style from './CardTrueFalse.module.css';
import { useDispatch } from 'react-redux';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { testSelectTrueOrFalseCard, testUnselectTrueOrFalseCard } from '../../redux/actions/testModuleAction';

export const CardTrueFalse = ({ cardId, translate, value, pathToFile, urlToImage,
  user, selected, userAnswer, index, countCards }) => {
  const dispatch = useDispatch();

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  const onClickSelectTrueOrFalse = (userAnswer) => {
    dispatch(testSelectTrueOrFalseCard(cardId, userAnswer));
  }

  const onClickUnselectTrueOrFalse = () => {
    dispatch(testUnselectTrueOrFalseCard(cardId));
  }

  return (
    <div className={style.card}>
      <div className={style.index}>{index} из {countCards}</div>
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
          <button onClick={() => selected && userAnswer ? onClickUnselectTrueOrFalse()
            : onClickSelectTrueOrFalse(true)}
            className={`${style.left__button} ${selected && userAnswer ? style.selected : ''}`}>Верно</button>
          <button onClick={() => selected && !userAnswer ? onClickUnselectTrueOrFalse()
            : onClickSelectTrueOrFalse(false)}
            className={`${style.right__button} ${selected && !userAnswer ? style.selected : ''}`}>Неверно</button>
        </div>
      </div>
    </div>
  );
}