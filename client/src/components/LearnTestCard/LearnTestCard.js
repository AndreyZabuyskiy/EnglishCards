import style from './LearnTestCard.module.css';

export const LearnTestCard = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <span>Определения</span>
          <button className={style.button__sound}>🔈</button>
        </div>
        <div>⚑</div>
      </div>
      <div className={style.content}>
        <div>Четыре</div>
        <div><img className={style.image} src={"https://scientificrussia.ru/images/s/szs-full.jpg"} /></div>
      </div>
      <div className={style.footer}>
        <div className={style.footer__text}>Выбирите правильный термин</div>
        <div className={style.options}>
          <div className={style.row__options}>
            <div className={style.option}>
              <div className={style.option__number}>1</div>
              <span>two</span>
            </div>
            <div className={style.option}>
              <div className={style.option__number}>2</div>
              <span>three</span>
            </div>
          </div>
          <div className={style.row__options}>
            <div className={style.option}>
              <div className={style.option__number}>3</div>
              <span>one</span>
            </div>
            <div className={style.option}>
              <div className={style.option__number}>4</div>
              <span>four</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}