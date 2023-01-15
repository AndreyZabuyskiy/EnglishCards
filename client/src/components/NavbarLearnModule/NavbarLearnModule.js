import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round, totalNumberCards, passedCards, onClickExit, isLearnRoundDone,
  isLearnModuleDone, isShowMenu, setIsShowMenu }) => {
  const widthLine = Math.round(passedCards / totalNumberCards * 100);

  const onClickMenu = (e) => {
    e.stopPropagation();
    setIsShowMenu(prev => !prev);
  }

  return (
    <div className={style.container}>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <div className={style.menu} onClick={onClickMenu}>
            <p>Заучивание ↓</p>
          </div>
          <ul className={style.menu__list} style={{ display: isShowMenu ? 'block' : 'none'}}>
            <li><span>🗎</span> Карточки</li>
            <li><span>🗎</span> Тест</li>
            <li><span>🗎</span> Подбор</li>
            <div className={style.menu__line}></div>
            <li>Главная</li>
            <li>Поиск</li>
          </ul>
        </div>
        <div>Этап { round }</div>
        <div className={style.item__right}>
          <button onClick={onClickExit}>🗙</button>
        </div>
      </div>
      {!isLearnRoundDone && !isLearnModuleDone &&
        <div className={style.line__wrapper} style={{ width: `${widthLine}%` }}></div>
      }
    </div>
  );
}