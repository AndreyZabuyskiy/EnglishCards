import { CardResultLearnRound } from '../CardResultLearnRound';
import style from './LearnRoundResult.module.css';

export const LearnRoundResult = ({ round, cards, lengthModuleCards, countLearnedCards }) => {
  const progressWidth = countLearnedCards / lengthModuleCards * 100;

  return (
    <div className={style.container}>
      <div className={style.header__wrapper}>
        <div className={style.header}>
          <div className={style.header__message}>Well done!</div>
          <div className={style.message__progressbar}>
            {countLearnedCards} / {lengthModuleCards} words
          </div>
          <div className={style.progress__bar}>
            <div className={style.progress__bar__result} style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>
      </div>
      <div className={style.cards__wrapper}>
        <div className={style.cards}>
          <span>The list of learned words</span>
          {
            cards.map(card => <CardResultLearnRound term={card.term} definition={card.definition}
              pathToFile={card.pathToFile} urlToImage={card.urlToImage} key={card._id} />)
          }
        </div>
      </div>
    </div>
  );
}