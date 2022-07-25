import style from './UIMenuModule.module.css';

export const UIMenuModule = () => {
  return (
    <div className={style.UI__rows}>
    <div>
      <div className={style.UI__single__row}>Изучать</div>
      <div className={style.UI__single__row}>Карточки</div>
      <div className={style.UI__single__row}>Заучивание</div>
      <div className={style.UI__single__row}>Письмо</div>
      <div className={style.UI__single__row}>Правописание</div>
      <div className={style.UI__single__row}>Тест</div>
    </div>
    <div>
      <div className={style.UI__single__row}>Играть</div>
      <div className={style.UI__single__row}>Подбор</div>
      <div className={style.UI__single__row}>Гравитация</div>
    </div>
  </div>
  );
}