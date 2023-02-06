import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round, totalNumberCards, passedCards, onClickExit, isLearnRoundDone, isLearnModuleDone, isShowMenu, setIsShowMenu, isShowMenuParam, setIsShowMenuParam }) => {
  const widthLine = Math.round(passedCards / totalNumberCards * 100);

  const onClickMenu = (e) => {
    e.stopPropagation();
    setIsShowMenuParam(false);
    setIsShowMenu(prev => !prev);
  }

  const onClickMenuParam = e => {
    e.stopPropagation();
    setIsShowMenu(false);
    setIsShowMenuParam(prev => !prev);
  }

  return (
    <div className={style.container}>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <div className={style.menu__memorization} onClick={onClickMenu}>
            <p>Learn ↓</p>
          </div>
          <ul className={style.menu__list} style={{ display: isShowMenu ? 'block' : 'none'}}>
            <li><span>🗎</span> Cards</li>
            <li><span>🗎</span> Test</li>
            <li><span>🗎</span> Match</li>
            <div className={style.menu__line}></div>
            <li>Home</li>
          </ul>
        </div>
        <div>
          <button className={style.button__level} onClick={onClickExit}>
            Level {round}
          </button>
        </div>
        <div className={style.item__right}>
          <div className={style.menu__params__wrapper} onClick={onClickMenuParam}>
            <span>Options</span>
            <ul className={style.menu__list__param} style={{ display: isShowMenuParam ? 'block' : 'none'}}>
              <li>Learn</li>
              <li>Write</li>
              <li>Spell</li>
            </ul>
          </div>
          <div className={style.exit__button__wrapper}>
            <button onClick={onClickExit}>🗙</button>
          </div>
        </div>
      </div>
      {!isLearnRoundDone && !isLearnModuleDone &&
        <div className={style.line__wrapper} style={{ width: `${widthLine}%` }}></div>
      }
    </div>
  );
}