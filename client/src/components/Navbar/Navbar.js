import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Navbar = () => {
  const user = useSelector(state => {
    const { auth } = state;
    return auth.state;
  });

  useEffect(() => {
    console.log('navbar render');
  }, [user]);

  let links = [
    <Link to={HOME_ROUTE}>Login</Link>,
    <Link to={HOME_ROUTE}>Register</Link>
  ]

  if (user) {
    links = <span>Выйти</span>
  }

  return (
    <div className={style.container__navbar}>
      <div className={style.content}>
        <div className={style.main}>
          <Link to={HOME_ROUTE}>Main</Link>
        </div>
        <div className={style.links}>
        { links }
        </div>
      </div>
    </div>
  );
}