import { Link, useParams } from 'react-router-dom';
import { WRITE_MODULE } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import style from './WriteEndViewRound.module.css';
import { removeWriteModule } from '../../redux/actions/writeLearnModuleAction';

export const WriteEndViewRound = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const countCards = props.cards.length;
  const countCorrectCards = props.cards.filter(card => card.status === 1).length;
  const interestRatioCorrectAnswers = countCorrectCards / countCards * 100;

  const onClickStartOver = () => {
    dispatch(removeWriteModule(id));
  }

  return (
    <div className={style.container}>
      <div className={style.round__header}>
        <div className={style.round__summary}>
          <div className={style.header}>Stage { props.module.round + 1 }</div>
          <div className={style.subheader}>{countCorrectCards}/{countCards} - { interestRatioCorrectAnswers }%</div>
        </div>
        <div>
          <Link onClick={onClickStartOver} className={style.UIButton} to={`${WRITE_MODULE}/${id}`}>
            Start over
          </Link>
        </div>
      </div>
      {props.cards?.map(card => (
        <div className={`${style.write__answer} 
          ${card.status === 1 ? style.answer__correct : style.answer__incorrect}`}
        >
          <div className={style.UIIcon__answer}>
            {card.status === 1 ? "✓" : "❌"}
          </div>
          <div className={style.value}>{ card.card.term }</div>
          <div className={style.translate}>{ card.card.translate }</div>
        </div>
      ))}
    </div>
  );
}