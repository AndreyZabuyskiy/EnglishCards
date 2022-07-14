import { useSelector } from "react-redux";
import { StudyModule } from '../../components/StudyModule';
import style from './Home.module.css';

export const Home = () => {
  const user = useSelector(state => {
    const { auth } = state;
    return auth.user;
  });

  const modules = useSelector(state => {
    const { module } = state;
    return module.modules;
  });

  return (
    <div className={style.container}>
      {modules?.map((module, index) => (
        <StudyModule
          key={index}
          title={module.title}
          countWords={module.countWords}
          login={user.login}
        />
      ))}
    </div>
  );
}