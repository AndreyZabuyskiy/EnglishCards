import style from './StudyModule.module.css';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export const StudyModule = ({ _id, countWords, email, title }) => {
  const onClickRemoveModule = (e) => {
    e.preventDefault();
    alert('onClickRemoveModule');
  }

  return (
    <Link to={`${HOME_ROUTE}/${_id}`} className={style.module}>
      <div className={style.wrapper}>
        <div>
          <div>
            <span className={style.count__words}> { countWords } words</span>
            <span className={style.login}>{email}</span>
          </div>
          <div className={style.title}>{title}</div>
        </div>
        <div><button onClick={onClickRemoveModule} className={style.btn__remove}>🗑</button></div>
      </div>
    </Link>
  );
}