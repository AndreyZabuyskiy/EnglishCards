import style from './NavbarScreenCards.module.scss';
import { Link, useParams } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export const NavbarScreenCards = (props) => {
  const { id } = useParams();
  
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div>Карточки</div>
        <div >
          <div className={style.count__cards}>{props.currentWord + 1}/{props.countWords}</div>
          <div>{props.title}</div>
        </div>
        <div>
          <Link className={style.button__exit}  to={`${HOME_ROUTE}/${id}`}>✕</Link>
        </div>
      </div>
      <div className={style.load}></div>
    </div>
  );
}