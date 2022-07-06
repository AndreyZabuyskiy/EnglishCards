import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions';
import style from './Login.module.css';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const clickLogin = () => {
    dispatch(loginAction(login, password));
  }

  return (
    <div className={style.container__form}>
      <div className={style.form}>
        <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" className={style.img} />
        <div className={style.title}>User log in</div>
        <input className={style.login} type="text" name="login" placeholder='login...'
          value={login} onChange={(e) => setLogin(e.target.value)} />
        <input className={style.password} type="password" name="password" placeholder='password...'
         value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => clickLogin()} className={style.button}>Login</button>
      </div>
    </div>
  );
}