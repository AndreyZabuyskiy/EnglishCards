import style from './ResultLearnModule.module.css';

export const ResultLearnModule = ({ onClickStartOverLearnModule }) => {
  return (
    <div className={style.container__wrapper}>
      <div className={style.container}>
        <div className={style.image__wrapper}>
          <img src='https://abrakadabra.fun/uploads/posts/2022-02/1645752759_1-abrakadabra-fun-p-kubok-na-prozrachnom-fone-2.png' />
        </div>
        <div className={style.title}>Congratulations! You have learned everything</div>
        <div className={style.text}>
          Repeat learning to practice the same or try other learning mode questions
        </div>
        <div className={style.button__wrapper}>
          <button onClick={onClickStartOverLearnModule} className={style.button}>Repeat</button>
        </div>
      </div>
    </div>
  )
}