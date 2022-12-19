import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CREATE_MODULE } from '../../utils/consts';
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

  useEffect(() => { }, [user]);

  return (
    <>
      {user
        ?
        <div className={style.container__navbar}>
          <div>
            <Link className={`${style.button}`} to={HOME_ROUTE}>Main</Link>
            <button className={style.create__button}
              onClick={() => navigate(CREATE_MODULE)}>Create</button>
          </div>
          <div className={style.links}>
            <button
              className={`${style.logout} ${style.button}`}
              onClick={clickLogout}>Logout</button>
          </div>
        </div>
        :
        <div className={style.container__navbar}>
          <div>
            <Link className={`${style.button}`} to={HOME_ROUTE}>Main</Link>
          </div>
          <div className={style.links}>
            <Link className={`${style.login} ${style.button}`} to={LOGIN_ROUTE}>Login</Link>
            <Link className={`${style.button}`} to={REGISTRATION_ROUTE}>Register</Link>
          </div>
        </div>
      }
    </>
  );
}