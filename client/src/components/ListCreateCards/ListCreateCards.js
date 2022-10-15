import { AddCardButton } from "../AddCardButton/AddCardButton";
import { CardForm } from "../CardForm/CardForm";

export const ListCreateCards = (props) => {
  return (
    <div>
      {
        props?.cards.map((card, index) => (
          <CardForm key={index}
            index={index}
            _id={card._id}
            value={card.value}
            translate={card.translate}
            imgUrl={card.imgUrl}
            cards={props.cards}
            setCards={props.setCards}
          />
        ))
      }

      <AddCardButton
        isCreateModule={props.isCreateModule}
        index={props.cards.length}
        cards={props.cards}
        setCards={props.setCards} />
    </div>
  );
}