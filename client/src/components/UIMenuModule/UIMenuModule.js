import style from './UIMenuModule.module.css';
import { Link } from 'react-router-dom';
import { LEARN_MODULE, SCREEN_CARDS, SPELL_MODULE, TEST_MODULE, WRITE_MODULE, } from '../../utils/consts';

export const UIMenuModule = (props) => {
  return (
    <ul className={style.container}>
      <div className={style.row__links}>
        <Link className={style.link} to={`${SCREEN_CARDS}/${props.id}`}>
          <div><span>🗎</span>Flashcards</div>
        </Link>
        <Link className={style.link} to={`${LEARN_MODULE}/${props.id}`}>
          <div><span>🗎</span>Learn</div>
        </Link>
      </div>
      <div className={style.row__links}>
        <Link className={style.link} to={`${TEST_MODULE}/${props.id}`}>
          <div><span>🗎</span>Test</div>
        </Link>
        <Link className={`${style.link} ${style.last__link}`} to={`${SCREEN_CARDS}/${props.id}`}>
          <div><span>🗎</span>Match</div>
        </Link>
      </div>
    </ul>
  );
}