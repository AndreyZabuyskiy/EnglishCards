import { CardResultLearnRound } from '../CardResultLearnRound';
import style from './LearnRoundResult.module.css';

export const LearnRoundResult = ({ round, cards, lengthModuleCards, countLearnedCards }) => {
  const progressWidth = countLearnedCards / lengthModuleCards * 100;

  return (
    <div className={style.container}>
      <div className={style.header__wrapper}>
        <div className={style.header}>
          <div className={style.header__message}>Perfect, you realize success!</div>
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
          <span>Count of words learned</span>
          {
            cards.map(card => <CardResultLearnRound value={card.value} translate={card.translate}
              pathToFile={card.pathToFile} urlToImage={card.urlToImage} key={card._id} />)
          }
        </div>
      </div>
    </div>
  );
}