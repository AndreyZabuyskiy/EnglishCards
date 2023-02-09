import style from './LearnCard.module.css';
import { LearnTestCard } from '../LearnTestCard';
import { LearnWriteCard } from '../../components';

export const LearnCard = ({ roundId, card, options, user, isIncorrectAnswer, isCorrectAnswer, optionSelectedUser, onClickOption, onClickCheckAnswer, correctAnswer, userAnswer, isUnknowAnswer, clickUnknowAnswer }) => {
  return (
    <>
      {card &&
        <div className={style.container}>
          {
            card.status === 0 
            ? <LearnTestCard roundId={roundId} card={card} user={user} options={options}
                isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                optionSelectedUser={optionSelectedUser} onClickOption={onClickOption} />
            : <LearnWriteCard card={card} user={user} onClickCheckAnswer={onClickCheckAnswer}
                isIncorrectAnswer={isIncorrectAnswer} isCorrectAnswer={isCorrectAnswer}
                correctAnswer={correctAnswer} userAnswer={userAnswer} isUnknowAnswer={isUnknowAnswer}
                clickUnknowAnswer={clickUnknowAnswer} />
          }
        </div>
      }
    </>
  );
}