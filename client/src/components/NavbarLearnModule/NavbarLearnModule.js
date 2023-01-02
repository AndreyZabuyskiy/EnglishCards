import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round }) => {
  return (
    <div className={style.container}>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <button>Заучивание</button>
        </div>
        <div>Этап { round?.round }</div>
        <div className={style.item__right}>
          <button>🗙</button>
        </div>
      </div>
      <div className={style.line__wrapper}></div>
    </div>
  );
}