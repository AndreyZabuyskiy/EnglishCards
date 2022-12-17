import { Link, useParams } from 'react-router-dom';
import { LEARN_MODULE } from '../../utils/consts';
import style from './WriteEndViewRound.module.css';

export const WriteEndViewRound = (props) => {
  const { id } = useParams();
  
  const countCards = props.cards.length;
  const countCorrectCards = props.cards.filter(card => card.status === 1).length;
  const interestRatioCorrectAnswers = countCorrectCards / countCards * 100;

  return (
    <div className={style.container}>
      <div className={style.round__header}>
        <div className={style.round__summary}>
          <div className={style.header}>Этап { props.module.round + 1 }</div>
          <div className={style.subheader}>{countCorrectCards}/{countCards} - { interestRatioCorrectAnswers }%</div>
        </div>
        <div>
          <Link className={style.UIButton} to={`${LEARN_MODULE}/${id}`}>Начать сначала</Link>
        </div>
      </div>
      {props.cards?.map(card => (
        <div className={`${style.write__answer} 
          ${card.status === 1 ? style.answer__correct : style.answer__incorrect}`}
        >
          <div className={style.UIIcon__answer}>
            {card.status === 1 ? "✓" : "❌"}
          </div>
          <div className={style.value}>{ card.card.value }</div>
          <div className={style.translate}>{ card.card.translate }</div>
        </div>
      ))}
    </div>
  );
}