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
      <h1 className={style.title}> { moduleData?.module?.title } </h1>

      <div className={style.header}>
        <div className={style.UI__rows}>
          <div>
            <div className={style.UI__single__row}>Изучать</div>
            <div className={style.UI__single__row}>Карточки</div>
            <div className={style.UI__single__row}>Заучивание</div>
            <div className={style.UI__single__row}>Письмо</div>
            <div className={style.UI__single__row}>Правописание</div>
            <div className={style.UI__single__row}>Тест</div>
          </div>
          <div>
            <div className={style.UI__single__row}>Играть</div>
            <div className={style.UI__single__row}>Подбор</div>
            <div className={style.UI__single__row}>Гравитация</div>
          </div>
        </div>
        
        <div className={style.card__item__container}>
          <div className={style.card__item}>
            { moduleData?.words?.[cardItemIndex].value }
          </div>
          <div className={style.cards__items__buttons}>
            <button
              className={style.button__card__item}
              onClick={() => clickBack()}
            >
              ←
            </button>

            <div className={ style.counter__cards }>
              { cardItemIndex + 1 }
            </div>
            
            <button
              className={style.button__card__item}
              onClick={() => clickForward()}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className={style.count__words}>
        Термины в модуле ({ moduleData?.words.length })
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