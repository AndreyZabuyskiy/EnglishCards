import style from './UIMenuModule.module.css';
import { Link } from 'react-router-dom';
import { LEARN_MODULE, SCREEN_CARDS, SPELL_MODULE, TEST_MODULE, WRITE_MODULE, } from '../../utils/consts';

export const UIMenuModule = (props) => {
  return (
    <ul className={style.container}>
      <li><p>Карточки</p></li>
      <li><p>Заучивание</p></li>
      <li><p>Тест</p></li>
      <li><p>Подбор</p></li>
    </ul>
  );
}