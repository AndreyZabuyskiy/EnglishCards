import { CardResultLearnRound } from '../CardResultLearnRound';
import style from './LearnRoundResult.module.css';

export const LearnRoundResult = ({ round, cards, lengthModuleCards }) => {
  console.log('LearnRoundResult round -->', round);
  console.log('LearnRoundResult lengthModuleCards -->', lengthModuleCards);
  console.log('LearnRoundResult cards -->', cards);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>Превосходно, вы делаете успехи!</div>
        <div>{cards.length} / {lengthModuleCards} терминов</div>
        <div className={style.progress__bar}>

        </div>
      </div>
      <div className={style.cards}>
        <div>Термины изучены на этом этапе</div>
        <CardResultLearnRound />
        <CardResultLearnRound />
        <CardResultLearnRound />
      </div>
    </div>
  );
}