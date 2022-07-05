import style from './Login.module.css';

export const Login = () => {
  return (
    <div className={style.container__form}>
      <div className={style.form}>
        <div className={style.title}>User log in</div>
        <input className={style.login} type="text" name="login" placeholder='login...' />
        <input className={style.password} type="password" name="password" placeholder='password...' />
        <button className={style.button}>Login</button>
      </div>
    </div>
  );
}