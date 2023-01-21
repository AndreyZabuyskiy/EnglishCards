import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudyModule, Navbar } from "../../components";
import { fetchModules } from "../../redux/actions";
import style from './Home.module.css';

export const Home = () => {
  const dispatch = useDispatch();

  const [isShowOptions, setIsShowOptions] = useState(false);
  const [option, setOption] = useState('Created');

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const modules = useSelector(state => {
    const { modulesReducer } = state;
    return modulesReducer.modules;
  });

  useEffect(() => {
    dispatch(fetchModules());
  }, []);

  const onClickForm = () => {
    setIsShowOptions(false);
  }

  const onClickSelect = (e) => {
    e.stopPropagation();
    setIsShowOptions(prev => !prev);
  }

  const onClickOption = (opt) => {
    setOption(opt);
  }

  return (
    <div className={style.container} onClick={onClickForm}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

      <div className={style.content}>
        <div className={style.filter__inputs}>
          <div className={style.filter}>
            <div className={style.select__filter} onClick={onClickSelect}>{ option }</div>
            <div className={style.options} style={{display: isShowOptions ? 'block' : 'none'}}>
              <div className={style.option} onClick={() => onClickOption('Created')}>Created</div>
              <div className={style.option} onClick={() => onClickOption('Viewed')}>Viewed</div>
            </div>
          </div>

          <input className={style.input} type="text" placeholder="search modules..." />
        </div>

        {modules?.map((item, index) => (
          <>
            {item.data.length !== 0 && 
              <>
                <div className={style.dashboard__feed__group}>
                  <p>{item.title}</p>
                  <div className={style.line}></div>
                </div>
                {item.data.map((module, idx) => (
                  <StudyModule
                    key={index}
                    title={module.title}
                    countWords={module.countWords}
                    login={user.login}
                    id={module._id}
                  />
                ))}
              </>
            }
          </>
        ))}
      </div>
    </div>
  );
}

          /*<StudyModule
              key={index}
              title={item.module.title}
              countWords={item.module.countWords}
              login={user.login}
              id={item.module._id}
            />*/