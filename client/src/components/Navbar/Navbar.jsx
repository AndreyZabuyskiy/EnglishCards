import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CREATE_MODULE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../../redux/actions/authAction';
import { NavbarModules } from '../';
import React from 'react';

export const Navbar = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modulesRef = useRef();

  const [visibleModules, setVisibleModules] = useState(false);

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const clickLogout = () => {
    dispatch(logout());
    navigate(LOGIN_ROUTE);
  }

  const handleOutsideModules = (e) => {
    const path = e.composedPath();

    if (!path.includes(modulesRef.current)) {
      setVisibleModules(false);
    } else {
      setVisibleModules(prev => !prev);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideModules);
  }, []);

  useEffect(() => { }, [user]);

  return (
    <>
      {user
        ?
        <div className={style.container__navbar}>
          <div className={style.content}>
            <div className={style.button__main__wrapper}>
              <Link className={style.button__main} to={HOME_ROUTE}>Home</Link>
            </div>
            <div className={style.your__library}
              style={{ borderBottom: visibleModules ? '3px solid #a8b1ff' : '' }}>
              <button ref={modulesRef}>Modules</button>
              <div className={style.modules__lists__wrapper}
                style={{ display: visibleModules ? 'block' : 'none' }} >
                <NavbarModules />
              </div>
            </div>
            <div className={style.create__button__wrapper}>
              <button className={style.create__button} onClick={() => navigate(CREATE_MODULE)}>
                Create
              </button>
            </div>
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
});