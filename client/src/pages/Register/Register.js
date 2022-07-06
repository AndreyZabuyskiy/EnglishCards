import style from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions';
import { Link } from "react-router-dom";

export const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const click_register = () => {
    dispatch(register(login, password));
  }

  return (
    <div className={style.container__form}>
      <div className={style.form}>
        <div className={style.title}>Register</div>

        <input className={style.login} type="text" name="login" placeholder='login...'
          value={login} onChange={e => setLogin(e.target.value)} />

        <input className={style.password} type="password" name="password" placeholder='password...'
          value={password} onChange={e => setPassword(e.target.value)} />

        <Link to="/home" className={style.button} onClick={() => click_register()}>Register</Link>
      </div>
    </div>
  );
}