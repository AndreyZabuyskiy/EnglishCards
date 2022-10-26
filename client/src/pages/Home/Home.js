import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudyModule, Navbar } from "../../components";
import { fetchModules } from "../../redux/actions";
import style from './Home.module.css';

export const Home = () => {
  const dispatch = useDispatch();

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

  return (
    <div className={style.container}>
      <div className={style.container__navbar}>
        <Navbar />
      </div>

      <div className={style.content}>
        {modules?.map((item, index) => (
          <StudyModule
            key={index}
            title={item.module.title}
            countWords={item.module.countWords}
            login={user.login}
            id={item.module._id}
          />
        ))}
      </div>
    </div>
  );
}