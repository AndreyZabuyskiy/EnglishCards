import { LearnTestCard } from '../../components/LearnTestCard';
import { LearnWriteCard } from '../../components/LearnWriteCard';
import style from './LearnModule.module.css';

export const LearnModule = () => {
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
        {/* <LearnTestCard /> */}
        <LearnWriteCard />
      </div>
    </>
  );
}