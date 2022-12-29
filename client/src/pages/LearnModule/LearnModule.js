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

  const { learnModuleId, isDone, round } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  console.log('LearnModule round -->', round);

  return (
    <>
      {round &&
        <div>
          <div className={style.NavbarLearnModule}>
            <div className={style.item__left}>
              <button>Заучивание</button>
            </div>
            <div>Этап { round?.round }</div>
            <div className={style.item__right}>
              <button>🗙</button>
            </div>
          </div>
          <div className={style.content}>
            {!isDone
              ?
                <LearnTestCard roundId={round._id} />
              :
                <h1>LearnModule done</h1>
            }


            {/* <LearnTestCard /> */}
            {/* <LearnWriteCard /> */}
          </div>
        </div>
      }
    </>
  );
}