import style from './TestWriteCard.module.css';
import { REACT_APP_API_URL } from '../../http/baseUrl';

export const TestWriteCard = ({ translate, pathToFile, urlToImage, user }) => {
  let imgSrc = '';
  if (pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.login}/${pathToFile}`;
  } else if (urlToImage) {
    imgSrc = `${urlToImage}`;
  }

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div>Определение</div>
        <div>20 из 20</div>
      </div>

      <div className={style.content}>
        <div className={style.value}>{ translate }</div>
        {imgSrc && <div> <img src={`${imgSrc}`} className={style.img} /> </div>}
      </div>

      <div className={style.footer}>
        <div className={style.text}>Ваш ответ</div>
        <input type="text" placeholder='Введите ответ' />
        <div className={style.next__button__wrapper}>
          <button>Далее</button>
        </div>
      </div>
    </div>
  );
}