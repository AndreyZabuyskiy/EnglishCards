import style from './FeedbackHeading.module.css';

export const FeedbackHeading = (props) => {
  return (
    <div className={style.container}>
      <div className={style.UIHeading}>
        <span className={style.UIEmoticons}>😕</span>
        <span className={style.UIHeadingText}>Выучите этот термин!</span>
      </div>
      <div className={style.content}>
        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>Определение</div>
          <div className={style.UIItemTextWithImage}>
            <div className={`${style.UIItemValue} ${style.translate}`}>{props.translate}</div>
            <div className={style.UIButtonWrapper}>🔈</div>
          </div>
        </div>

        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>Вы сказали</div>
          <div className={`${style.UIItemValue} ${style.answer}`}>{props.userAnswer}</div>
          <div className={style.UILinkInner}>
            <button className={style.UILink}>Изменить: я ответил правильно</button>
          </div>
        </div>

        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>Правильный ответ</div>
          <div className={`${style.UIItemValue} ${style.rightAnswer}`}>{props.value}</div>
        </div>
      </div>
      <div className={style.fixedContinueButton}>
        <button>Чтобы продолжить, нажмите любую клавишу</button>
      </div>
    </div>
  )
}