import { CardResultLearnRound } from '../CardResultLearnRound';
import style from './LearnRoundResult.module.css';

export const LearnRoundResult = ({ round, cards, lengthModuleCards }) => {
  const progressWidth = cards.length / lengthModuleCards * 100;

  return (
    <div className={style.container}>
      <div className={style.header__wrapper}>
        <div className={style.header}>
          <div className={style.header__message}>Превосходно, вы делаете успехи!</div>
          <div className={style.message__progressbar}>
            {cards.length} / {lengthModuleCards} терминов
          </div>
          <div className={style.progress__bar}>
            <div className={style.progress__bar__result} style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>
      </div>
      <div className={style.cards__wrapper}>
        <div className={style.cards}>
          <span>Термины изучены на этом этапе</span>
          {
            cards.map(card => <CardResultLearnRound value={card.value} translate={card.translate}
              pathToFile={card.pathToFile} urlToImage={card.urlToImage} key={card._id} />)
          }
        </div>
      </div>
    </div>
  );
}