import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../redux/actions';

export const Navbar = () => {
  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickLogout = () => {
    dispatch(logout());
    navigate(LOGIN_ROUTE);
  }

  useEffect(() => { }, [user]);;

  let links = [
    <Link className={style.login} to={HOME_ROUTE}>Login</Link>,
    <Link to={HOME_ROUTE}>Register</Link>
  ]

  if (user) {
    links = <button onClick={clickLogout}>Выйти</button>
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