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
            pathToFile={card.pathToFile}
            searchQuery={card.searchQuery}
            cards={props.cards}
            setCards={props.setCards}
            urlToImage={card.urlToImage}
            searchQueryError={card.searchQueryError}
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