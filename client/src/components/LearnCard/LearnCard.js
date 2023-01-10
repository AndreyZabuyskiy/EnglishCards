import style from './LearnCard.module.css';
import { LearnTestCard } from '../LearnTestCard';
import { LearnWriteCard } from '../../components';

export const LearnCard = ({ roundId, card, user, options, isIncorrectAnswer, isCorrectAnswer, optionSelectedUser, onClickOption }) => {
  console.log('LearnCard card -->', card);
  console.log('LearnCard options -->', options);

  return (
    <>
      {card &&
        <div className={style.container}>
          {
            card.status === 0 
            ?
              <LearnTestCard roundId={roundId} card={card} user={user} options={options}
                isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                optionSelectedUser={optionSelectedUser} onClickOption={onClickOption} />
            : <LearnWriteCard card={card} user={user} />
          }
        </div>
      }
    </>
  );
}