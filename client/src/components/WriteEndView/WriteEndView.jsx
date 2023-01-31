import style from './WriteEndView.module.css';
import { WriteEndViewRound } from '../WriteEndViewRound';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getResultWriteModule } from '../../redux/actions/writeLearnModuleAction';

export const WriteEndView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getResultWriteModule(id));
  }, []);

  const { module, cards } = useSelector(state => {
    const { resultModuleReducer } = state;
    return resultModuleReducer;
  });

  return (
    <div className={style.content}>
      {module && cards &&
        <WriteEndViewRound module={module} cards={cards} />
      }
    </div>
  )
}