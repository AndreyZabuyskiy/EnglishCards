import { AddCardButton } from "../AddCardButton/AddCardButton";
import { CardForm } from "../CardForm/CardForm";

export const ListCreateCards = (props) => {
  return (
    <div>
      {
        props?.cards.map((card, index) => (
          <CardForm key={index}
            id={card.id}
            value={card.value}
            translate={card.translate}
            imgUrl={card.imgUrl}
            cards={props.cards}
            setCards={props.setCards}
          />
        ))
      }

      <AddCardButton
        index={props.cards.length}
        cards={props.cards}
        setCards={props.setCards} />
    </div>
  );
}