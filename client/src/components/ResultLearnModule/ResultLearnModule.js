import style from './ResultLearnModule.module.css';

export const ResultLearnModule = () => {
  return (
    <div className={style.container__wrapper}>
      <div className={style.container}>
        <div className={style.image__wrapper}>
          <img src='https://abrakadabra.fun/uploads/posts/2022-02/1645752759_1-abrakadabra-fun-p-kubok-na-prozrachnom-fone-2.png' />
        </div>
        <div className={style.title}>Поздравляем! Вы все выучили</div>
        <div className={style.text}>
          Повторите изучение, чтобы попрактиковать те же вопросы или попробовать другой режим обучения
        </div>
        <div className={style.button__wrapper}>
          <button className={style.button}>Изучать снова</button>
        </div>
      </div>
    </div>
  )
}