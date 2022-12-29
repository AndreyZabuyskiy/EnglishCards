import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LearnTestCard } from '../../components/LearnTestCard';
import { LearnWriteCard } from '../../components/LearnWriteCard';
import { fetchLearnModule } from '../../redux/actions';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  const { learnModuleId, isDone} = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  return (
    <>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <button>Заучивание</button>
        </div>
        <div>Этап 3</div>
        <div className={style.item__right}>
          <button>🗙</button>
        </div>
      </div>
      <div className={style.content}>
        {isDone
          ?
            <h1>LearnModule done</h1>
          :
            <h1>LearnModule round</h1>
        }


        {/* <LearnTestCard /> */}
        {/* <LearnWriteCard /> */}
      </div>
    </>
  );
}