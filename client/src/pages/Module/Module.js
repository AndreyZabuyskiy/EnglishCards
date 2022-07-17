import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleBy } from "../../redux/actions";
import style from './Module.module.scss';
import { CardElement } from "../../components/CardElement";

export const Module = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModuleBy(id));
  }, []);

  const moduleData = useSelector(state => {
    const { moduleReducer } = state;
    return moduleReducer.module;
  });

  console.log(moduleData);
  
  return (
    <div className={style.container}>
      <div className={style.title}> { moduleData?.module?.title } </div>
      <div className={style.cards}>
        {moduleData?.words.map(card => {
          return <CardElement
            value={card.value}
            translate={card.translate} />
        })}
      </div>
    </div>
  )
}

/*
return (
  <div className={style.card}>
    <div>{card.value}</div>
    <div className={style.card__translate}>{card.translate}</div>
  </div>
)
*/