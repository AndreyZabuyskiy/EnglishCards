import style from './SetPageInfo.module.scss';
import { Link } from 'react-router-dom';

export const SetPageInfo = (props) => {
  return (
    <div className={ style.page__information }>
      <div className={ style.user__info }>
        <div>Автор</div>
        <div className={style.login}>{ props.user?.login }</div>
      </div>

      <div className={style.page__information__buttons}>
        <Link to={''} className={style.page__information__button}>+</Link>
        <Link to={''} className={style.page__information__button}>✎</Link>
        <Link to={''} className={style.page__information__button}>⌫</Link>
      </div>
    </div>
  );
}