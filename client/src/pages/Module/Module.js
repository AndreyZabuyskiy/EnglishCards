import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleBy } from "../../redux/actions";
import style from './Module.module.scss';
import { CardElement } from "../../components/CardElement";

export const Module = () => {
  const [cardItemIndex, setCardItemIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModuleBy(id));
  }, []);

  const moduleData = useSelector(state => {
    const { moduleReducer } = state;
    return moduleReducer.module;
  });
  
  const clickBack = () => {
    if(cardItemIndex > 0) { 
      setCardItemIndex(cardItemIndex - 1);
    }
  }

  const clickForward = () => {
    if(cardItemIndex < moduleData.words.length - 1) {
      setCardItemIndex(cardItemIndex + 1);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.title}> { moduleData?.module?.title } </div>

      <div className={style.header}>
        <div className={style.UIRow}>
          <div>Карточки</div>
          <div>Заучивание</div>
          <div>Письмо</div>
          <div>Правописание</div>
          <div>Тест</div>
        </div>
        
        <div className={style.card__item__container}>
          <div className={style.card__item}>
            { moduleData?.words?.[cardItemIndex].value }
          </div>
          <div className={style.cards__items__buttons}>
            <button onClick={() => clickBack()}>Назад</button>
            <div className={ style.counter__cards } >{ cardItemIndex }</div>
            <button onClick={() => clickForward()}>Вперед</button>
          </div>
        </div>
      </div>

      <div>
        {moduleData?.words.map((card, index) => {
          return <CardElement
            key={index}
            value={card.value}
            translate={card.translate} />
        })}
      </div>
    </div>
  )
}