import style from './StudyModule.module.css';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export const StudyModule = ({_id, countWords, login, title}) => {
  return (
    <Link to={`${HOME_ROUTE}/${_id}`} className={style.module}>
      <div>
        <span className={style.count__words}> { countWords } words</span>
        <span className={style.login}>{login}</span>
      </div>
      <div className={style.title}>{title}</div>
    </Link>
  );
}