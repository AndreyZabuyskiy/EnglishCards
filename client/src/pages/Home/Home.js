import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudyModule } from '../../components/StudyModule';
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
      {modules?.map((module, index) => (
        <StudyModule
          key={index}
          title={module.title}
          countWords={module.countWords}
          login={user.login}
          id={module._id}
        />
      ))}
    </div>
  );
}