import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { HOME_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';

export const Navbar = () => {
  return (
    <div className={style.container__navbar}>
      <div className={style.content}>
        <div className={style.main}>
          <Link to={HOME_ROUTE}>Main</Link>
        </div>
        <div className={style.links}>
          <Link to={REGISTRATION_ROUTE}>Register</Link>
        </div>
      </div>
    </div>
  );
}