import style from './ModeControls.module.css';

export const ModeControls = (props) => {
  const widthCorrectAnswers = props.countCorrectAnswers / props.totalNumberCards * 100;
  const widthIncorrectAnswers = props.countIncorrectAnswers / props.totalNumberCards * 100;
  const widthCountAnswers = (props.cards.length - props.countCheckAnswers) / props.totalNumberCards * 100;

  return (
    <div className={style.container}>
      <div className={style.ModeControls__back}>
        <button className={style.UILink}>
          <div>
            <span>←</span>
            <span className={style.text__back}>Назад</span>
          </div>
        </button>
      </div>

      <div className={style.content}>
        <div className={style.modeName}>
          <span className={style.UIIcon}>✎</span>
          <span className={style.modeLabel}>Письмо</span>
        </div>

        <div className={style.controls}>
          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__fill}`}>
              <div className={style.fill} style={{width: `${widthCountAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Осталось</div>
              <div>{ props.cards.length - props.countCheckAnswers }</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__invalid}`}>
              <div className={style.invalid} style={{width: `${widthIncorrectAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Неправильно</div>
              <div>{ props.countIncorrectAnswers }</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__valid}`}>
              <div className={style.valid} style={{width: `${widthCorrectAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Правильно</div>
              <div>{ props.countCorrectAnswers }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}