import style from './HomeModules.module.css';
import { StudyModule } from "../StudyModule";

export const HomeModules = ({ modules, user }) => {
  return (
    <>
      {modules?.map((item, index) => (
        <>
          {item.data.length !== 0 &&
            <>
              <div className={style.dashboard__feed__group}>
                <p>{item.title}</p>
                <div className={style.line}></div>
              </div>
              {item.data.map((module) => (
                <StudyModule key={index} login={user.login} {...module} />
              ))}
            </>
          }
        </>
      ))}
    </>
  )
}