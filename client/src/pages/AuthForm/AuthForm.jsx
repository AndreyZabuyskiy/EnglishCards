import style from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { loginAction, registerAction } from '../../redux/actions/authAction';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LOGIN_ROUTE, HOME_ROUTE } from '../../utils/consts';
import { Navbar } from '../../components';
import { useNavigate } from "react-router-dom";
import userProfileImage from '../../assets/user-profile-image.png';

export const AuthForm = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset} = useForm({mode: 'onChange'});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const onSubmit = (data) => {
    if (isLogin) {
      dispatch(loginAction(data.email, data.password));
      navigate(`${HOME_ROUTE}`);
    } else {
      dispatch(registerAction(data.email, data.password));
    }
  }
  
  return (
    <div className={style.container}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

      <div className={style.container__form}>
        <div className={style.form}>
          <img src={userProfileImage} alt="" className={style.img} />
        
          <div className={style.title}>
            {isLogin ? "User log in" : "User registration"}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.input__container}>
              <input className={style.input} type="text" name="email" placeholder='email...'
                {...register('email', {
                  required: '*required field',
                  minLength: {
                    value: 4,
                    message: 'Email must be at least 4 characters long'
                  }
                })}
              />
              {errors.email &&
                <div className={style.error}>{errors.email.message}</div>
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
            <button className={style.button} disabled={!isValid}>{ isLogin ? 'Log in' : 'Register' }</button>
          </form>
        </div>
      </div>
    </div>
  );
}