import style from './LearnTestCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { checkTestCard, fetchLearnCard } from '../../redux/actions';
import { OptionLearnCard } from '../OptionLearnCard';

export const LearnTestCard = ({ roundId, card, options, onClickOption, isIncorrectAnswer, optionSelectedUser }) => {
  console.log('LearnTestCard isIncorrectAnswer ===>', isIncorrectAnswer);
  console.log('LearnTestCard optionSelectedUser ===>', optionSelectedUser);

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
              {/*<div onClick={() => onClickOption(card._id, options[0]._id)}
                className={`${style.option} ${isIncorrectAnswer && options[0].isRight ? style.option__correct : ''}`}>
                <div className={style.option__number}>1</div>
                <span>{ options[0].value }</span>
              </div>
              <div onClick={() => onClickOption(card._id, options[1]._id)}
                className={`${style.option} ${isIncorrectAnswer && options[1].isRight ? style.option__correct : ''}`}>
                <div className={style.option__number}>2</div>
                <span>{ options[1].value }</span>
              </div>*/}
              
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[0]} serialNumber={1} card={card} optionSelectedUser={optionSelectedUser} />
              <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                option={options[1]} serialNumber={2} card={card} optionSelectedUser={optionSelectedUser} />
            </div>
            <div className={style.row__options}>
              {/*<div onClick={() => onClickOption(card._id, options[2]._id)}
                className={`${style.option} ${isIncorrectAnswer && options[2].isRight ? style.option__correct : ''}`}>
                <div className={style.option__number}>3</div>
                <span>{ options[2].value }</span>
              </div>
              <div onClick={() => onClickOption(card._id, options[3]._id)}
                className={`${style.option} ${isIncorrectAnswer && options[3].isRight ? style.option__correct : ''}`}>
                <div className={style.option__number}>4</div>
                <span>{ options[3].value }</span>
              </div>*/}
                
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