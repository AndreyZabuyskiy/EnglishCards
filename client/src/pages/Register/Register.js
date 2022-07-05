import style from './Register.module.css';

export const Register = () => {
  return (
    <div className={style.container__form}>
      <div className={style.form}>
        <div className={style.title}>Register</div>
        <input className={style.login} type="text" name="login" placeholder='login...' />
        <input className={style.password} type="password" name="password" placeholder='password...' />
        <button className={style.button}>Register</button>
      </div>
    </div>
  );
}