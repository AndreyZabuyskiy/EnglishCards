import style from './LearnWords.module.css';

export const LearnWords = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.item}>Day</div>
      <div className={style.item}>Week</div>
      <div className={style.item}>Month</div>
      <div className={style.item}>Half-year</div>
    </div>
  )
}