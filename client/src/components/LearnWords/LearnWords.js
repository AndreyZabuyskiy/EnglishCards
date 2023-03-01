import { Link } from 'react-router-dom';
import style from './LearnWords.module.css';

export const LearnWords = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.column}>
        <Link to="" className={style.item}>
          <span>Day</span>
        </Link>
        <Link to="" className={style.item}>
          <span>Week</span>
        </Link>
      </div>
      <div className={style.column}>
        <Link to="" className={style.item}>
          <span>Month</span>
        </Link>
        <Link to="" className={style.item}>
          <span>Half-year</span>
        </Link>
      </div>
    </div>
  )
}