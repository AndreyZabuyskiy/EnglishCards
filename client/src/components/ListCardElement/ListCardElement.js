import style from './ListCardElement.module.css';
import { CardElement } from "../CardElement";

export const ListCardElement = (props) => {
  return (
    <>
      <div className={style.count__cards}>
        Термины в модуле ({ props?.moduleData?.words.length })
      </div>

        <div>
          {props?.moduleData?.words.map((card, index) => {
            return <CardElement
              key={index}
              value={card.value}
              translate={card.translate} />
          })}
        </div>
    </>
  );
}