import style from './UIMenuModule.module.css';
import { Link } from 'react-router-dom';
import { LEARN_MODULE, SCREEN_CARDS, SPELL_MODULE, TEST_MODULE, WRITE_MODULE, } from '../../utils/consts';

export const UIMenuModule = (props) => {
  return (
    <div className={style.UI__rows}>
    <div>
      <div className={style.UI__single__row}>Изучать</div>
      <div className={style.UI__single__row}>
        <Link to={`${SCREEN_CARDS}/${props.id}`} className={style.link}>Карточки</Link>
      </div>
      <div className={style.UI__single__row}>
        <Link to={`${LEARN_MODULE}/${props.id}`} className={style.link}>Заучивание</Link>
      </div>
      <div className={style.UI__single__row}>
        <Link to={`${WRITE_MODULE}/${props.id}`} className={style.link}>Письмо</Link>
      </div>
      <div className={style.UI__single__row}>
        <Link to={`${SPELL_MODULE}/${props.id}`} className={style.link}>Правописание</Link>
      </div>
      <div className={style.UI__single__row}>
        <Link to={`${TEST_MODULE}/${props.id}`} className={style.link}>Тест</Link>
      </div>
    </div>
    <div>
      <div className={style.UI__single__row}>Играть</div>
      <div className={style.UI__single__row}>
        <Link to={``} className={style.link}>Подбор</Link>
      </div>
      <div className={style.UI__single__row}>
        <Link to={``} className={style.link}>Гравитация</Link>
      </div>
    </div>
  </div>
  );
}