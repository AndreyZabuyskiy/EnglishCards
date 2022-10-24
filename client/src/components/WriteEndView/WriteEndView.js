import style from './WriteEndView.module.css';
import { WriteEndViewRound } from '../WriteEndViewRound';

export const WriteEndView = () => {
  return (
    <div className={style.content}>
      <WriteEndViewRound />
    </div>
  )
}