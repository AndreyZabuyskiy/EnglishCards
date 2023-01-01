import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavbarLearnModule } from '../../components';
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

  return (
    <>
      {round &&
        <div>
          <NavbarLearnModule round={round} />
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