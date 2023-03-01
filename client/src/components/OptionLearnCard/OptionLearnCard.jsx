import style from './OptionLearnCard.module.css';
import classNames from 'classnames';

export const OptionLearnCard = ({ serialNumber, option, onClickOption, isIncorrectAnswer, card, optionSelectedUser, isCorrectAnswer }) => {
  const cardStyle = classNames(`${style.option}`,
    { [`${style.option__select}`]: !optionSelectedUser },
    { [`${style.option__correct}`]: isIncorrectAnswer && option.isRight },
    { [`${style.option__incorrect}`]: isIncorrectAnswer && option._id === optionSelectedUser },
    { [`${style.option__not__selected}`]: isIncorrectAnswer && !option.isRight },
    { [`${style.option__correct}`]: isCorrectAnswer && option.isRight }
  );

  return (
    <>
      {option &&
        <div onClick={() => onClickOption(card._id, option)} className={cardStyle}>
          <div className={style.option__number}>{ serialNumber }</div>
          <span>{ option.term }</span>
        </div>
      }
    </>
  );
}