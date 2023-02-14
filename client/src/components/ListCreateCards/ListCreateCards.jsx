import { AddCardButton } from "../AddCardButton/AddCardButton";
import { CardForm } from "../CardForm/CardForm";
import React from "react";

export const ListCreateCards = React.memo(({ cards, setCards }) => {
  return (
    <div>
      {cards.map((card, index) => (
        <CardForm key={card._id} index={index} {...card} setCards={setCards} />
      ))}

      <AddCardButton index={cards.length} setCards={setCards} />
    </div>
  );
})