import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round, totalNumberCards, passedCards, onClickExit }) => {
  const widthLine = Math.round(passedCards / totalNumberCards * 100);

  return (
    <div className={style.container}>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <button>Заучивание</button>
        </div>
        <div>Этап { round }</div>
        <div className={style.item__right}>
          <button onClick={onClickExit}>🗙</button>
        </div>
      </div>
      <div className={style.line__wrapper} style={{width: `${widthLine}%`}}></div>
    </div>
  );
}