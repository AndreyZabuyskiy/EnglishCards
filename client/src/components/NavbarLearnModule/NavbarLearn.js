import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round }) => {
  return (
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
    </div>
  );
}