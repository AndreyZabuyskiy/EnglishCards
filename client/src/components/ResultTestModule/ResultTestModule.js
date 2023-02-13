import style from './ResultTestModule.module.css';
import diagram from '../../assets/test-result-diagram.webp';
import fileImage from '../../assets/file-image.png';
import propTypes from 'prop-types';

export const ResultTestModule = ({ countCorrectUserAnswer, countIncorrectUserAnswer, onClickStartOverTest,
  onClickMoveLearnModule }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.text}>You are making progress!</div>
      <div>
        <div className={style.body}>
          <div className={style.body__block}>
            <div className={style.body__title}>Your time is 2 minutes</div>
            <div className={style.test__result}>
              <div><img src={diagram} className={style.diagram} alt='' /></div>
              <div className={style.count__answers}>
                <div className={style.correct__answers}>
                  <div>Correct</div>
                  <div className={style.count}>{countCorrectUserAnswer}</div>
                </div>
                <div className={style.incorrect__answers}>
                  <div>Incorrect</div>
                  <div className={style.count}>{countIncorrectUserAnswer}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.button__cards__wrapper}>
            <div className={style.body__title}>Next steps</div>
            <div className={style.button__cards}>
              <div onClick={onClickMoveLearnModule} className={style.card__button}>
                <div><img src={fileImage} className={style.card__button__image} alt='' /></div>
                <div className={style.card__button__body}>
                  <p>Practice terms</p>
                  <p>Learn these terms to consolidate knowledge.</p>
                </div>
              </div>
              <div onClick={onClickStartOverTest} className={style.card__button}>
                <div><img src={fileImage} className={style.card__button__image} alt='' /></div>
                <div className={style.card__button__body}>
                  <p>Take a new test</p>
                  <p>Take another test to become confident in your knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ResultTestModule.propTypes = {
  countCorrectUserAnswer: propTypes.number,
  countIncorrectUserAnswer: propTypes.number,
  onClickStartOverTest: propTypes.func,
  onClickMoveLearnModule: propTypes.func
};