import style from './LearnWriteCard.module.css';

export const LearnWriteCard = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>Definitions</span>
        <button>🔈</button>
      </div>
      <div className={style.content}>
        <p>два</p>
        <div><img className={style.image} src={"https://scientificrussia.ru/images/s/szs-full.jpg"} /></div>
      </div>
      <div className={style.footer}>
        <p>Your answer</p>
        <input type='text' placeholder='Enter your answer' />
        <div className={style.footer__inputs}>
          <button className={style.button__unknow}>I don't know</button>
          <button className={style.button__answer}>Answer</button>
        </div>
      </div>
    </div>
  );
}