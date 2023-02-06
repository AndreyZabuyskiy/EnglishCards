import style from './ListCardElement.module.css';
import { CardElement } from "../CardElement";

export const ListCardElement = ({ moduleData, user }) => {
  return (
    <>
      <div className={style.count__cards}>
        Terms in the module ({ moduleData?.cards.length })
      </div>

        <div>
          {moduleData?.cards.map((card, index) => {
            return <CardElement key={index} {...card} user={user} />
          })}
        </div>
    </>
  );
}