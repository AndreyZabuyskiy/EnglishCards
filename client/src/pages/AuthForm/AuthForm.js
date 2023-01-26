import style from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { loginAction, registerAction } from '../../redux/actions/authAction';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LOGIN_ROUTE, HOME_ROUTE } from '../../utils/consts';
import { Navbar } from '../../components';
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset} = useForm({mode: 'onChange'});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const onSubmit = (data) => {
    if (isLogin) {
      dispatch(loginAction(data.login, data.password));
    } else {
      dispatch(registerAction(data.login, data.password));
    }
    navigate(`${HOME_ROUTE}`);
  }
  
  return (
    <div className={style.container}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

      <div className={style.container__form}>
        <div className={style.form}>
          <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt="" className={style.img} />
        
          <div className={style.title}>
            {isLogin ? "User log in" : "User registeration"}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.input__container}>
              <input className={style.input} type="text" name="login" placeholder='login...'
                {...register('login', {
                  required: '*required field',
                  minLength: {
                    value: 4,
                    message: 'Login must be at least 4 characters long'
                  }
                })}
              />
              {errors.login &&
                <div className={style.error}>{errors.login.message}</div>
              }
            </div>
            <div className={style.input__container}>
              <input className={style.input} type="password" name="password" placeholder='password...'
                {...register('password', {
                  required: '*required field',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                  }
                })}
              />
              {errors.password &&
                <div className={style.error}>{errors.password.message}</div>
              }
            </div>
            <button className={style.button} disabled={!isValid}>{ isLogin ? 'Login' : 'Register' }</button>
          </form>
        </div>
      </div>
    </div>
  );
}