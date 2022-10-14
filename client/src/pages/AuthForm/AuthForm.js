import style from './AuthForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction, register } from '../../redux/actions';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { Navbar } from '../../components';

export const AuthForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const clickLogin = () => {
    dispatch(loginAction(login, password));
  }

  const clickRegister = () => {
    dispatch(register(login, password));
  }
  
  return (
    <div className={style.container}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

      <div className={style.container__form}>
        <div className={style.form}>
          <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" className={style.img} />
        
          <div className={style.title}>
            {isLogin ? "User log in" : "User registeration"}
          </div>

          <input className={style.input} type="text" name="login" placeholder='login...'
            value={login} onChange={(e) => setLogin(e.target.value)} />
          <input className={style.input} type="password" name="password" placeholder='password...'
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to={HOME_ROUTE}>
            {isLogin
              ? <button onClick={() => clickLogin()} className={style.button}>Login</button>
              : <button onClick={() => clickRegister()} className={style.button}>Register</button>
            }
          </Link>
        </div>
      </div>
    </div>
  );
}