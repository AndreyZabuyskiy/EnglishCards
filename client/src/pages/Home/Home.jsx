import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, HomeLoaderModules, HomeModules, LearnWords } from "../../components";
import { fetchModules, deleteModuleById } from "../../redux/actions/modulesAction";
import style from './Home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const optionsRef = useRef();

  const [visibleOptions, setVisibleOptions] = useState(false);
  const [option, setOption] = useState('Created');

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const { modules, isLoadModules } = useSelector(state => {
    const { modulesReducer } = state;
    return modulesReducer;
  });

  const handleOutsideOptions = (e) => {
    const path = e.composedPath();

    if (!path.includes(optionsRef.current)) {
      setVisibleOptions(false);
    } else {
      setVisibleOptions(prev => !prev);
    }
  }

  const onClickOption = (opt) => {
    setOption(opt);
  }

  const deleteModule = (id) => {
    dispatch(deleteModuleById(id));
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideOptions);
    dispatch(fetchModules());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

        <div className={style.content}>
          <div className={style.filter__inputs}>
            <div className={style.filter}>
              <div ref={optionsRef} className={style.select__filter}>{option}</div>
              <div className={style.options} style={{ display: visibleOptions ? 'block' : 'none' }}>
                <div className={style.option} onClick={() => onClickOption('Created')}>Created</div>
                <div className={style.option} onClick={() => onClickOption('Recently viewed')}>
                  Recently viewed
                </div>
              </div>
            </div>

            <input className={style.input} type="text" placeholder="search modules..." />
          </div>
        
          <LearnWords />
        
          {isLoadModules
            ? <HomeModules modules={modules} user={user} deleteModule={deleteModule} />
            : <HomeLoaderModules />}
        </div>
    </div>
  );
}