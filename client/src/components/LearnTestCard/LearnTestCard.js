import style from './LearnTestCard.module.css';
import { OptionLearnCard } from '../OptionLearnCard';

export const LearnTestCard = ({ roundId, card, options, onClickOption, isIncorrectAnswer, optionSelectedUser }) => {
  return (
    <>
      {card &&
        <div className={style.container}>
        <div className={style.header}>
          <div>
            <span>Определения</span>
            <button className={style.button__sound}>🔈</button>
          </div>
          <div>⚑</div>
        </div>
        <div className={style.content}>
          <div>{ card.translate }</div>
            <div>
              <img className={style.image} src={"https://scientificrussia.ru/images/s/szs-full.jpg"} />
            </div>
        </div>
        <div className={style.footer}>
          <div className={style.footer__text}>Выбирите правильный термин</div>
          <div className={style.options}>
            <div className={style.row__options}>
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[0]} serialNumber={1} card={card} optionSelectedUser={optionSelectedUser} />
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[1]} serialNumber={2} card={card} optionSelectedUser={optionSelectedUser} />
            </div>
            <div className={style.row__options}>
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[2]} serialNumber={3} card={card} optionSelectedUser={optionSelectedUser} />
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[3]} serialNumber={4} card={card} optionSelectedUser={optionSelectedUser} />
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}