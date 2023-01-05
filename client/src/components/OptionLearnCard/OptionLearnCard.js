import style from './OptionLearnCard.module.css';

export const OptionLearnCard = ({ serialNumber, option, onClickOption, isIncorrectAnswer, card, optionSelectedUser, isCorrectAnswer }) => {
  let cardStyle = `${style.option} ${style.option__select}`;

  if (isIncorrectAnswer && option.isRight) {
    cardStyle = `${style.option} ${style.option__correct}`;
  } else if (isIncorrectAnswer && option._id === optionSelectedUser) {
    cardStyle = `${style.option} ${style.option__incorrect}`;
  } else if (isIncorrectAnswer && !option.isRight) {
    cardStyle = `${style.option} ${style.option__not__selected}`;
  } else if (isCorrectAnswer && option.isRight) {
    cardStyle = `${style.option} ${style.option__correct}`;
  }

  return (
    <>
      <div onClick={() => onClickOption(card._id, option._id)} className={cardStyle}>
        <div className={style.option__number}>{ serialNumber }</div>
        <span>{ option.value }</span>
      </div>
    </>
  );
}