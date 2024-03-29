import style from './LearnTestCard.module.css';
import { OptionLearnCard } from '../OptionLearnCard';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useSelector } from "react-redux"

export const LearnTestCard = ({ roundId, card, user, onClickOption, isIncorrectAnswer, optionSelectedUser, isCorrectAnswer }) => {
  const { options } = useSelector(state => {
    const { learnCardReducer } = state;
    return learnCardReducer;
  });

  let imgSrc = '';
  if (card?.pathToFile) {
    imgSrc = `${REACT_APP_API_URL}/${user.email}/${card.pathToFile}`;
  } else if (card?.urlToImage) {
    imgSrc = `${card.urlToImage}`;
  }

  return (
    <>
      {card &&
        <div className={style.container}>
          <div className={style.header}>
            <div>
              <span>Definition</span>
              <button className={style.button__sound}>🔈</button>
            </div>
            <div>⚑</div>
          </div>
          <div className={style.content}>
            <div>{card.definition}</div>
            { imgSrc && <img src={`${imgSrc}`} className={style.image} alt='' /> }
          </div>
          <div className={style.footer}>
            <div className={style.footer__text}>Choose the right term</div>
            {options &&
              <div className={style.options}>
                <div className={style.row__options}>
                  <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                    option={options[0]} serialNumber={1} card={card} optionSelectedUser={optionSelectedUser}
                    isCorrectAnswer={isCorrectAnswer}/>
                  <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                    option={options[1]} serialNumber={2} card={card} optionSelectedUser={optionSelectedUser}
                    isCorrectAnswer={isCorrectAnswer}/>
                </div>
                <div className={style.row__options}>
                  <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                    option={options[2]} serialNumber={3} card={card} optionSelectedUser={optionSelectedUser}
                    isCorrectAnswer={isCorrectAnswer}/>
                  <OptionLearnCard onClickOption={onClickOption} isIncorrectAnswer={isIncorrectAnswer}
                    option={options[3]} serialNumber={4} card={card} optionSelectedUser={optionSelectedUser}
                    isCorrectAnswer={isCorrectAnswer}/>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </>
  );
}