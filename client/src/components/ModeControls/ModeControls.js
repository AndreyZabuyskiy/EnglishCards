import style from './ModeControls.module.css';

export const ModeControls = () => {
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
              <div className={style.fill}></div>
            </div>
            <div className={style.labal}>
              <div>Осталось</div>
              <div>0</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__invalid}`}>
              <div className={style.invalid}></div>
            </div>
            <div className={style.labal}>
              <div>Неправильно</div>
              <div>0</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__valid}`}>
              <div className={style.valid}></div>
            </div>
            <div className={style.labal}>
              <div>Правильно</div>
              <div>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}