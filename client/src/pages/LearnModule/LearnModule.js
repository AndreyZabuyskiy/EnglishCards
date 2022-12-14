import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navbar, CardWriteAnswer, ModeControls, WriteEndView } from '../../components';
import { fetchLearnModule } from '../../redux/actions';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const { module, cards, index } = useSelector(state => {
    const { learnModuleReducer } = state;
    return learnModuleReducer;
  });

  useEffect(() => {
    dispatch(fetchLearnModule(id));
  }, []);

  return (
    <>
      <Navbar />

      <div className={style.container}>
        <div className={style.container__content}>
          <ModeControls />
          {cards &&
            <CardWriteAnswer user={user}
              value={cards[index].card.value}
              translate={cards[index].card.translate}
              imgUrl={cards[index].card.imgUrl} />
          }

          {/* <WriteEndView /> */}
        </div>
      </div>
    </>
  );
}