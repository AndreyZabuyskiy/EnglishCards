import style from './NavbarScreenCards.module.scss';
import { Link } from 'react-router-dom';

export const NavbarScreenCards = (props) => {
  console.log('Navbar -->', props);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div>Карточки</div>
        <div >
          <div className={style.count__cards}>{props.currentWord + 1}/{props.countWords}</div>
          <div>{props.title}</div>
        </div>
        <div>
          <Link className={style.button__exit} to={``}>✕</Link>
        </div>
      </div>
    </div>
  );
}