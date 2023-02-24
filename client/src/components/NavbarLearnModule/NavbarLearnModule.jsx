import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import style from './NavbarLearn.module.css';

export const NavbarLearnModule = ({ round, totalNumberCards, passedCards, onClickExit, isLearnRoundDone, isLearnModuleDone }) => {
  const widthLine = Math.round(passedCards / totalNumberCards * 100);

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuParam, setVisibleMenuOptions] = useState(false);

  const menuRef = useRef();
  const menuOptionsRef = useRef();

  const handleOutsideClickMenu = (e) => {
    const path = e.composedPath();

    if (!path.includes(menuRef.current)) {
      setVisibleMenu(false);
    } else {
      setVisibleMenu(prev => !prev);
    }
  };

  const handleOutsideClickOptions = (e) => {
    const path = e.composedPath();

    if (!path.includes(menuOptionsRef.current)) {
      setVisibleMenuOptions(false);
    } else {
      setVisibleMenuOptions(prev => !prev);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClickMenu);
    document.body.addEventListener('click', handleOutsideClickOptions);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.NavbarLearnModule}>
        <div className={style.item__left}>
          <div ref={menuRef} className={style.menu__memorization} >
            <p>Learn ↓</p>
          </div>
          <ul className={style.menu__list} style={{ display: visibleMenu ? 'block' : 'none'}}>
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
          <div ref={menuOptionsRef} className={style.menu__params__wrapper}>
            <span>Options</span>
            <ul className={style.menu__list__param} style={{ display: visibleMenuParam ? 'block' : 'none'}}>
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