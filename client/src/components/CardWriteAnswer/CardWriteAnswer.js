import style from './CardWriteAnswer.module.css';

export const CardWriteAnswer = () => {
  return (
    <div className={style.card}>
      <div className={style.header}>Определение</div>
      <div className={style.content}>
        <div className={style.translate}>Эгоист</div>
        <div>
          <img className={style.card__img}
            src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.text}>Ваш ответ</div>
        <div>
          <input className={style.input} type="text" placeholder="Введите ответ..." />
        </div>
        <div className={style.container__button}>
          <button>Далее</button>
        </div>
      </div>
    </div>
  );
}