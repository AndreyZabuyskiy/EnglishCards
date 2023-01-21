import style from './StudyModule.module.css';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export const StudyModule = (props) => {
  return (
    <Link to={`${HOME_ROUTE}/${props.id}`} className={style.module}>
      <div>
        <span className={style.count__words}> { props.countWords } words</span>
        <span className={style.login}>{props.login}</span>
      </div>
      <div className={style.title}>{props.title}</div>
    </Link>
  );
}