import style from './NavbarScreenCards.module.scss';
import { Link, useParams } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import { StudiedCardsLine } from '../StudiedCardsLine';

export const NavbarScreenCards = (props) => {
  const { id } = useParams();
  
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div>Карточки</div>
        <div >
          <div className={style.count__cards}>{props.currentCard + 1}/{props.countCards}</div>
          <div>{props.title}</div>
        </div>
        <div>
          <Link className={style.button__exit} to={`${HOME_ROUTE}/${id}`}>✕</Link>
        </div>
      </div>
      <div className={style.line__container}>
        <StudiedCardsLine
          cardItemIndex={props.currentCard}
          numberCards={props.countCards} />
      </div>
    </div>
  );
}