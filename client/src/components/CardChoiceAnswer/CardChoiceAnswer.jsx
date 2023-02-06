import style from './CardChoiceAnswer.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { testSelectOption, testUnselectOption } from '../../redux/actions/testModuleAction';
import { useDispatch } from 'react-redux';

export const CardChoiceAnswer = ({ cardId, translate, options, pathToFile, urlToImage, isShowResult,
  user, countCards, index, isCorrectUserSelected }) => {
  const dispatch = useDispatch();

  console.log('cardId -->', cardId);

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  const onClickSelectOption = (index) => {
    dispatch(testSelectOption(cardId, index));
  }

  const onClickUnselectOption = (index) => {
    dispatch(testUnselectOption(cardId, index));
  }

  return (
    <div className={style.card}>
      <div className={style.index}>{index} из {countCards}</div>
      <div className={style.header}>
        Definition
      </div>
      <div className={style.content}>
        <div className={style.value}>{ translate }</div>
        <div>
          {imgSrc && <div> <img src={`${imgSrc}`} className={style.img} /> </div>}
        </div>
      </div>
      <div className={style.footer}>
        {!isShowResult
          ?
          <>
            <div className={style.text}>Select the right term</div>
            <div className={style.buttons}>
              <div className={style.buttoms__column__1}>
                <button className={`${options[0].selected ? style.selected__option : ''}`}
                  onClick={() => options[0].selected ? onClickUnselectOption(0) : onClickSelectOption(0)}>
                  {options[0].value}
                </button>
                <button className={`${options[1].selected ? style.selected__option : ''}`}
                  onClick={() => options[1].selected ? onClickUnselectOption(1) : onClickSelectOption(1)}>
                  {options[1].value}
                </button>
              </div>
              <div className={style.buttoms__column__2}>
                <button className={`${options[2].selected ? style.selected__option : ''}`}
                  onClick={() => options[2].selected ? onClickUnselectOption(2) : onClickSelectOption(2)}>
                  {options[2].value}
                </button>
                <button className={`${options[3].selected ? style.selected__option : ''}`}
                  onClick={() => options[3].selected ? onClickUnselectOption(3) : onClickSelectOption(3)}>
                  {options[3].value}
                </button>
              </div>
            </div>
          </>
          :
          <>
            {isCorrectUserSelected
              ? <div className={style.message__correct__answer}>Correct answer</div>
              : <div className={style.message__incorrect__answer}>Incorrect answer</div>
            }
            <div className={style.result__buttons}>
              <div className={style.buttoms__column__1}>
                <button className={`${options[0].isCorrect ? style.correct__user__answer : ''}
                  ${options[0].selected && !options[0].isCorrect ? style.incorrect__user__answer : ''}`}>
                  {options[0].value}
                </button>
                <button className={`${options[1].isCorrect ? style.correct__user__answer : ''}
                  ${options[1].selected && !options[1].isCorrect ? style.incorrect__user__answer : ''}`}>
                  {options[1].value}
                </button>
              </div>
              <div className={style.buttoms__column__2}>
                <button className={`${options[2].isCorrect ? style.correct__user__answer : ''}
                  ${options[2].selected && !options[2].isCorrect ? style.incorrect__user__answer : ''}`}>
                  {options[2].value}
                </button>
                <button className={`${options[3].isCorrect ? style.correct__user__answer : ''}
                  ${options[3].selected && !options[3].isCorrect ? style.incorrect__user__answer : ''}`}>
                  {options[3].value}
                </button>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}