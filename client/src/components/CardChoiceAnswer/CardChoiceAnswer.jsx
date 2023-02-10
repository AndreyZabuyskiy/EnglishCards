import style from './CardChoiceAnswer.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { testSelectOption, testUnselectOption } from '../../redux/actions/testModuleAction';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import propTypes from 'prop-types';

export const CardChoiceAnswer = ({ cardId, translate, options, pathToFile, urlToImage, isShowResult,
  user, countCards, index, isCorrectUserSelected }) => {
  const dispatch = useDispatch();

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
          {imgSrc && <img src={`${imgSrc}`} className={style.img} alt='' />}
        </div>
      </div>
      <div className={style.footer}>
        {!isShowResult
          ?
          <>
            <div className={style.text}>Select the right term</div>
            <div className={style.buttons}>
              <div className={style.buttoms__column__1}>
                <button className={classNames({[`${style.selected__option}`]: options[0].selected})}
                  onClick={() => options[0].selected ? onClickUnselectOption(0) : onClickSelectOption(0)}>
                  {options[0].value}
                </button>
                <button className={classNames({[`${style.selected__option}`]: options[1].selected})}
                  onClick={() => options[1].selected ? onClickUnselectOption(1) : onClickSelectOption(1)}>
                  {options[1].value}
                </button>
              </div>
              <div className={style.buttoms__column__2}>
                <button className={classNames({[`${style.selected__option}`]: options[2].selected})}
                  onClick={() => options[2].selected ? onClickUnselectOption(2) : onClickSelectOption(2)}>
                  {options[2].value}
                </button>
                <button className={classNames({[`${style.selected__option}`]: options[3].selected})}
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
                <button className={classNames(
                    {
                      [`${style.correct__user__answer}`]: options[0].isCorrect
                    },
                    {
                      [`${style.incorrect__user__answer}`]: options[0].selected && !options[0].isCorrect
                    }
                  )}
                >
                  {options[0].value}
                </button>
                <button className={classNames(
                    {
                      [`${style.correct__user__answer}`]: options[1].isCorrect
                    },
                    {
                      [`${style.incorrect__user__answer}`]: options[1].selected && !options[1].isCorrect
                    }
                  )}
                >
                  {options[1].value}
                </button>
              </div>
              <div className={style.buttoms__column__2}>
                <button className={classNames(
                    {
                      [`${style.correct__user__answer}`]: options[2].isCorrect
                    },
                    {
                      [`${style.incorrect__user__answer}`]: options[2].selected && !options[2].isCorrect
                    }
                  )}
                >
                  {options[2].value}
                </button>
                <button className={classNames(
                    {
                      [`${style.correct__user__answer}`]: options[3].isCorrect
                    },
                    {
                      [`${style.incorrect__user__answer}`]: options[3].selected && !options[3].isCorrect
                    }
                  )}
                >
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

CardChoiceAnswer.propTypes = {
  cardId: propTypes.string,
  translate: propTypes.string,
  options: propTypes.array,
  pathToFile: propTypes.string,
  urlToImage: propTypes.string,
  isShowResult: propTypes.bool,
  user: propTypes.object,
  countCards: propTypes.number,
  index: propTypes.number,
  isCorrectUserSelected: propTypes.bool
}