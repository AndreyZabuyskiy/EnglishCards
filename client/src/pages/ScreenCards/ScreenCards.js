import style from './ScreenCards.module.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchModuleById } from "../../redux/actions";
import { NavbarScreenCards } from "../../components/NavbarScreenCards";
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

  /*const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });*/

  const clickBack = (e) => {
    if(cardIndex > 0) { 
      setCardIndex(cardIndex - 1);
    }
    e.stopPropagation();
  }

  const clickForward = (e) => {
    if(cardIndex < moduleData.words.length - 1) {
      setCardIndex(cardIndex + 1);
    }
    e.stopPropagation();
  }

  return (
    <>
      <NavbarScreenCards
        title={moduleData?.module?.title}
        countWords={moduleData?.words?.length}
        currentWord={cardIndex}
      />

      <div className={style.container}>
        <BigCard
          value={moduleData?.words?.[cardIndex].value}
          translate={moduleData?.words?.[cardIndex].translate}
          img={moduleData?.words?.[cardIndex].imgUrl}
          clickForward={clickForward}
          clickBack={clickBack}
        />
        
        <div className={style.footer__text}>
          Нажмите ← или → для перехода вперед или назад
        </div>
      </div>
    </>
  );
}