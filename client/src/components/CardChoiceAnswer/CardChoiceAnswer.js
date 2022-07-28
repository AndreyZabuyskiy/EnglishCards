import style from './CardChoiceAnswer.module.css';

export const CardChoiceAnswer = () => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        Определение
      </div>
      <div className={style.content}>
        <div className={style.value}>Взбираться</div>
        <div>
          <img className={style.img}
            src='https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg' />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.text}>Выбирите правильный термин</div>
        <div className={style.buttons}>
          <div className={style.buttoms__column__1}>
            <button>cousin</button>
            <button>loud</button>
          </div>
          <div className={style.buttoms__column__2}>
            <button>brave</button>
            <button>climb</button>
          </div>
        </div>
      </div>
    </div>
  );
}