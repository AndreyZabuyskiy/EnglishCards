import style from './FeedbackHeading.module.css';

export const FeedbackHeading = (props) => {
  return (
    <div className={style.container}>
      <div className={style.UIHeading}>
        <span className={style.UIEmoticons}>😕</span>
        <span className={style.UIHeadingText}>Learn this term!</span>
      </div>
      <div className={style.content}>
        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>Definition</div>
          <div className={style.UIItemTextWithImage}>
            <div className={`${style.UIItemValue} ${style.translate}`}>{props.translate}</div>
            <div className={style.UIButtonWrapper}>🔈</div>
          </div>
        </div>

        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>You said</div>
          <div className={`${style.UIItemValue} ${style.answer}`}>{props.userAnswer}</div>
          <div className={style.UILinkInner}>
            <button className={style.UILink}>Change: I answered correctly</button>
          </div>
        </div>

        <div className={style.feedbackItem}>
          <div className={style.UIItemSix}>Corrent answer</div>
          <div className={`${style.UIItemValue} ${style.rightAnswer}`}>{props.value}</div>
        </div>
      </div>
      <div className={style.fixedContinueButton}>
        <button onClick={props.onClickNextQuestion}>Press any bottom to continue</button>
      </div>
    </div>
  )
}