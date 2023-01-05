import style from './CardResultLearnRound.module.css';

export const CardResultLearnRound = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.value}>discover</div>
        <div className={style.translate__wrapper}>
          <div className={style.translate}>совершать открытие</div>
          <div>
            <img className={style.image} src={"https://scientificrussia.ru/images/s/szs-full.jpg"} />
          </div>
        </div>
      </div>
      <div>🔈</div>
    </div>
  );
}