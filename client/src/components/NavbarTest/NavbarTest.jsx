import style from './NavbarTest.module.css';
import fileImage from '../../assets/file-image.png';
import { NavbarModuleNavigate } from '../NavbarModuleNavigate';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import propTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

export const NavbarTest = ({ moduleId, title, countCards, countUserAnsweredCards, countCorrectUserAnswer,
  isShowResult }) => {
  const widthLine = countUserAnsweredCards / countCards * 100;
  
  const navigate = useNavigate();
  const navigateRef = useRef();

  const [visibleNavigate, setVisibleNavigate] = useState(false);

  const handleOutsideClickNavigate = (e) => {
    const path = e.composedPath();

    if (!path.includes(navigateRef.current)) {
      setVisibleNavigate(false);
    } else {
      setVisibleNavigate(prev => !prev);
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClickNavigate);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.content__left}>
        <div className={style.img__wrapper}>
          <img className={style.img} src={fileImage} alt=''/>
        </div>
        <div className={style.button__navigate__wrapper}>
          <button ref={navigateRef} className={style.button__navigate}>
            Test
          </button>
          <div className={style.module__navigate} style={{display: visibleNavigate ? 'block' : 'none' }}>
            <NavbarModuleNavigate moduleId={moduleId} />
          </div>
        </div>
      </div>
      <div className={style.content__center}>
        <p>{!isShowResult ? countUserAnsweredCards : countCorrectUserAnswer} / {countCards}</p>
        <p>{ title }</p>
      </div>
      <div className={style.content__right}>
        <button className={style.button__exit} onClick={() => navigate(`${HOME_ROUTE}/${moduleId}`)}>
          <span>🗙</span>
        </button>
      </div>
      {!isShowResult && <div className={style.line} style={{ width: `${widthLine}%` }}></div>}
    </div>
  );
}

NavbarTest.propTypes = {
  moduleId: propTypes.string,
  title: propTypes.string,
  countCards: propTypes.number,
  countUserAnsweredCards: propTypes.number,
  countCorrectUserAnswer: propTypes.number,
  isShowResult: propTypes.bool,
  isShowModuleNavigate: propTypes.bool,
  setIsShowModuleNavigate: propTypes.func
}