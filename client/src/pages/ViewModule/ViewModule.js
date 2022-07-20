import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleById } from "../../redux/actions";
import style from './ViewModule.module.scss';
import { CardElement } from "../../components/CardElement";
import { Navbar } from "../../components/Navbar";
import { Link } from 'react-router-dom';
import { SCREEN_CARDS } from '../../utils/consts';

export const ViewModule = () => {
  const [cardItemIndex, setCardItemIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModuleById(id));
  }, []);

  const moduleData = useSelector(state => {
    const { moduleReducer } = state;
    return moduleReducer.module;
  });

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
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
    <>
      <Navbar />

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
              <button className={style.button__card__item} onClick={() => clickBack()}> ← </button>
              <div className={ style.counter__cards } >
                { cardItemIndex + 1 }/{ moduleData?.words?.length }
              </div>
              <button className={style.button__card__item} onClick={() => clickForward()}> → </button>

              <Link
                to={`${SCREEN_CARDS}/${id}`}
                className={style.link__screen__cards}
                moduleData={moduleData}
                user={user}>
                🔗
              </Link>
            </div>
          </div>
        </div>

        <div className={ style.page__information }>
          <div className={ style.user__info }>
            <div> Автор </div>
            <div className={style.login}>{ user?.login }</div>
          </div>
          <div className={style.page__information__buttons}>
            <Link to={''} className={style.page__information__button}>+</Link>
            <Link to={''} className={style.page__information__button}>✎</Link>
            <Link to={''} className={style.page__information__button}>⌫</Link>
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
    </>
  )
}