import { AddCardButton } from "../AddCardButton/AddCardButton";
import { CardForm } from "../CardForm/CardForm";
import { ImageUploadButton } from "../ImageUploadButton";

export const ListCreateCards = (props) => {
  return (
    <div>
      <ImageUploadButton />

      {
        props?.cards.map((card, index) => (
          <CardForm key={index}
            id={card.id}
            value={card.value}
            translate={card.translate}
            imgUrl={card.imgUrl}
          />
        ))
      }

      <AddCardButton index={props.cards.length} />
    </div>
  );
}