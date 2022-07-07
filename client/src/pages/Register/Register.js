import style from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions';

export const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const clickRegister = () => {
    dispatch(register(login, password));
  }

  return (
    <div className={style.container__form}>
      <div className={style.form}>
        <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" className={style.img} />

        <div className={style.title}>User sign in</div>
        <input className={style.input} type="text" name="login" placeholder='login...'
          value={login} onChange={(e) => setLogin(e.target.value)} />
        <input className={style.input} type="password" name="password" placeholder='password...'
         value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => clickRegister()} className={style.button}>sign in</button>
      </div>
    </div>
  );
}