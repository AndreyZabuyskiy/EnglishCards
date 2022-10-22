import style from './CardWriteAnswer.module.css';

export const CardWriteAnswer = () => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.content__header}>
          <div className={style.translate}>Подписать</div>
          <div className={style.UILink}>
            <button className={style.dont__know}>Не знаю</button>
          </div>
        </div>
        <div className={style.img__container}>
          <img className={style.card__img}
            src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.footer__input}>
          <input id="answer" className={style.text__input} type="text" />
          <label for="answer">Ваш ответ</label>
        </div>
        <div className={style.answer__button}>
          <button>Ответ</button>
        </div>
      </div>
    </div>
  );
}