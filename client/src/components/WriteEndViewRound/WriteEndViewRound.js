import { useState } from 'react';
import style from './WriteEndViewRound.module.css';

export const WriteEndViewRound = () => {
  const [cards, setCards] = useState(
  [
    {
      value: "two years ago",
      translate: "два года назад",
      isRight: true 
    },
    {
      value: "to turn",
      translate: "поворачивать",
      isRight: true 
    },
    {
      value: "to get in touch with sb",
      translate: "связаться с кем-то",
      isRight: true 
    },
    {
      value: "almost every day",
      translate: "практически каждый день",
      isRight: true 
      },
    {
      value: "to include",
      translate: "включать",
      isRight: false 
    },
    {
      value: "a couple of",
      translate: "пара (чего-либо)",
      isRight: false 
    },
    {
      value: "switch on/off",
      translate: "включать/выключать (2)",
      isRight: true 
    },
    {
      value: "turn on / off",
      translate: "включать/выключать (1)",
      isRight: false
    }
  ]);

  return (
    <div className={style.container}>
      <div className={style.round__header}>
        <div className={style.round__summary}>
          <div className={style.header}>Этап 1</div>
          <div className={style.subheader}>5/8 - 63%</div>
        </div>
        <div>
          <button className={style.UIButton}>Начать сначала</button>
        </div>
      </div>
      {cards?.map(card => (
        <div className={`${style.write__answer} 
          ${card.isRight ? style.answer__correct : style.answer__incorrect}`}
        >
          <div className={style.UIIcon__answer}>
            {card.isRight ? "✓" : "❌"}
          </div>
          <div className={style.value}>{ card.value }</div>
          <div className={style.translate}>{ card.translate }</div>
        </div>
      ))}
    </div>
  );
}