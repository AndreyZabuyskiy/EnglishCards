import { useSelector } from "react-redux";
import { REACT_APP_API_URL } from "../../http/baseUrl";
import style from './CardResultLearnRound.module.css';

export const CardResultLearnRound = ({ term, definition, pathToFile, urlToImage }) => {
  const { user } = useSelector(state => {
    const { authReducer } = state;
    return authReducer;
  });

  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.value__wrapper}>
          <div>{ term }</div>
        </div>
        <div className={style.translate__wrapper}>
          <div className={style.translate}>{ definition }</div>
          {imgSrc && <img className={style.image} src={`${imgSrc}`} alt='' />}
        </div>
      </div>
      <div className={style.sound__action}>
        <div>🔈</div>
      </div>
    </div>
  );
}