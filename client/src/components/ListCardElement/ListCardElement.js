import style from './ListCardElement.module.css';
import { CardElement } from "../CardElement";

export const ListCardElement = (props) => {
  return (
    <>
      <div className={style.count__cards}>
        Термины в модуле ({ props?.moduleData?.cards.length })
      </div>

        <div>
          {props?.moduleData?.cards.map((card, index) => {
            return <CardElement key={index} value={card.value}
              translate={card.translate} pathToFile={card.pathToFile}
              urlToImage={card.urlToImage} user={props.user} />
          })}
        </div>
    </>
  );
}