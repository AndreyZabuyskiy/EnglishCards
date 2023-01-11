import style from './ResultLearnModule.module.css';

export const ResultLearnModule = () => {
  return (
    <div className={style.container__wrapper}>
      <div className={style.container}>
        <div className={style.image__wrapper}>
          <img src='https://e7.pngegg.com/pngimages/404/406/png-clipart-golden-cup-golden-cup.png' />
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