import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchModuleById } from "../../redux/actions";
import { NavbarScreenCards } from "../../components/NavbarScreenCards";
import style from './ScreenCards.module.scss';
import { BigCard } from "../../components/BigCard";

export const ScreenCards = () => {
  const [cardIndex, setCardIndex] = useState(0);

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

  console.log(moduleData);

  return (
    <>
      <NavbarScreenCards />
      <div className={style.container}>
        <BigCard
          value={moduleData?.words?.[0].value}
          translate={moduleData?.words?.[0].translate}
          img={moduleData?.words?.[0].imgUrl}
        />
        
        <div className={style.footer__text}>
          Нажмите ← или → для перехода вперед или назад
        </div>
      </div>
    </>
  );
}