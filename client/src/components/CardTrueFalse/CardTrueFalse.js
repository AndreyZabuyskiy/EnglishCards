import style from './CardTrueFalse.module.css';

export const CardTrueFalse = () => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        <div className={style.content__translate}>
          <div className={style.content__header}>Определение</div>
          <div className={style.translate}>
            <div>Знание</div>
            <div>
              <img className={style.card__img}
                src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
            </div>
          </div>
        </div>
        <div className={style.content__value}>
          <div className={style.content__header}>Термин</div>
          <div className={style.value}>knowledge</div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.text}>Выбирите ответ</div>
        <div className={style.buttons}>
          <button className={style.left__button}>Верно</button>
          <button className={style.right__button}>Неверно</button>
        </div>
      </div>
    </div>
  );
}