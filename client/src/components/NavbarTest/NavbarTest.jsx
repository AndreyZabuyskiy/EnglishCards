import style from './NavbarTest.module.css';
import fileImage from '../../assets/file-image.png';

export const NavbarTest = ({ title, countCards, countUserAnsweredCards, countCorrectUserAnswer,
  isShowResult }) => {
  const widthLine = countUserAnsweredCards / countCards * 100;

  return (
    <div className={style.wrapper}>
      <div className={style.content__left}>
        <div className={style.img__wrapper}>
          <img className={style.img} src={fileImage} alt=''/>
        </div>
        <button className={style.button__navigate}>Тест</button>
      </div>
      <div className={style.content__center}>
        <p>{!isShowResult ? countUserAnsweredCards : countCorrectUserAnswer} / {countCards}</p>
        <p>{ title }</p>
      </div>
      <div className={style.content__right}>
        <button className={style.button__exit}>
          <span>🗙</span>
        </button>
      </div>
      {!isShowResult && <div className={style.line} style={{ width: `${widthLine}%` }}></div>}
    </div>
  );
}