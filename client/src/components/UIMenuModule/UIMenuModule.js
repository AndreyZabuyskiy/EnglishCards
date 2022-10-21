import style from './UIMenuModule.module.css';
import { Link } from 'react-router-dom';
import { LEARN_MODULE, SCREEN_CARDS, SPELL_MODULE, TEST_MODULE, WRITE_MODULE, } from '../../utils/consts';

export const UIMenuModule = (props) => {
  return (
    <ul className={style.container}>
      <div className={style.row__links}>
        <Link className={style.link} to={`${SCREEN_CARDS}/${props.id}`}>
          <div><span>🗎</span>Карточки</div>
        </Link>
        <Link className={style.link} to={`${LEARN_MODULE}/${props.id}`}>
          <div><span>🗎</span>Заучивание</div>
        </Link>
      </div>
      <div className={style.row__links}>
        <Link className={style.link} to={`${SCREEN_CARDS}/${props.id}`}>
          <div><span>🗎</span>Тест</div>
        </Link>
        <Link className={`${style.link} ${style.last__link}`} to={`${SCREEN_CARDS}/${props.id}`}>
          <div><span>🗎</span>Подбор</div>
        </Link>
      </div>
    </ul>
  );
}