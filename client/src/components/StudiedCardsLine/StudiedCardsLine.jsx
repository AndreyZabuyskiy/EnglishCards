import style from './StudiedCardsLine.module.scss';

export const StudiedCardsLine = (props) => {
  const lengthLoaded = props.cardItemIndex / props.numberCards * 100;
  
  return (
    <div className={style.load__line}>
      <div className={style.loaded} style={{width: `${lengthLoaded}%`}}></div>
    </div>
  );
}