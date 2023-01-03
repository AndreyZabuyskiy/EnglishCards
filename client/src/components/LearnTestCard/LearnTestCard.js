import style from './LearnTestCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { checkTestCard, fetchLearnCard } from '../../redux/actions';

export const LearnTestCard = ({ roundId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLearnCard(roundId));
  }, []);

  const { card, options } = useSelector(state => {
    const { learnCardReducer } = state;
    return learnCardReducer;
  });

  console.log('card ==>', card);
  console.log('options ==>', options);

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
              <div onClick={() => dispatch(checkTestCard(card._id, options[0]._id))}
                className={style.option}>
                <div className={style.option__number}>1</div>
                <span>{ options[0].value }</span>
              </div>
              <div onClick={() => dispatch(checkTestCard(card._id, options[1]._id))}
                className={style.option}>
                <div className={style.option__number}>2</div>
                <span>{ options[1].value }</span>
              </div>
            </div>
            <div className={style.row__options}>
              <div onClick={() => dispatch(checkTestCard(card._id, options[2]._id))}
                className={style.option}>
                <div className={style.option__number}>3</div>
                <span>{ options[2].value }</span>
              </div>
              <div onClick={() => dispatch(checkTestCard(card._id, options[3]._id))}
                className={style.option}>
                <div className={style.option__number}>4</div>
                <span>{ options[3].value }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}