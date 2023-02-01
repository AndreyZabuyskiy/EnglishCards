import style from './ResultTestModule.module.css';
import diagram from '../../assets/test-result-diagram.webp';
import fileImage from '../../assets/file-image.png';

export const ResultTestModule = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.text}>Вы делаете успехи!</div>
      <div>
        <div className={style.body}>
          <div className={style.body__block}>
            <div className={style.body__title}>Ваше время: 1 минута</div>
            <div className={style.test__result}>
              <div><img src={diagram} className={style.diagram} alt='' /></div>
              <div className={style.count__answers}>
                <div className={style.correct__answers}>
                  <div>Правильно</div>
                  <div className={style.count}>5</div>
                </div>
                <div className={style.incorrect__answers}>
                  <div>Неправильно</div>
                  <div className={style.count}>5</div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.button__cards__wrapper}>
            <div className={style.body__title}>Следующие шаги</div>
            <div className={style.button__cards}>
              <div className={style.card__button}>
                <div><img src={fileImage} className={style.card__button__image} alt='' /></div>
                <div className={style.card__button__body}>
                  <p>Попрактиковать термины</p>
                  <p>Изучите эти термины, чтобы закрепить знания.</p>
                </div>
              </div>
              <div className={style.card__button}>
                <div><img src={fileImage} className={style.card__button__image} alt='' /></div>
                <div className={style.card__button__body}>
                  <p>Пройти новый тест</p>
                  <p>Пройдите еще один тест, чтоб стать уверенее в своих знаниях.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}