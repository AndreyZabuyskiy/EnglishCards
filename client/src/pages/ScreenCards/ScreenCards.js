import style from './ScreenCards.module.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchModuleById } from "../../redux/actions";
import { NavbarScreenCards, BigCard } from '../../components';

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
  })

  const clickBack = (e) => {
    if(cardIndex > 0) { 
      setCardIndex(cardIndex - 1);
    }

    e.stopPropagation();
  }

  const clickForward = (e) => {
    if(cardIndex < moduleData.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }

    e.stopPropagation();
  }

  return (
    <>
      <NavbarScreenCards
        title={moduleData?.module?.title}
        countCards={moduleData?.cards?.length}
        currentCard={cardIndex}
      />

      <div className={style.container__content}>
        <BigCard
          value={moduleData?.cards?.[cardIndex].value}
          translate={moduleData?.cards?.[cardIndex].translate}
          pathToFile={moduleData?.cards?.[cardIndex].pathToFile}
          urlToImage={moduleData.cards?.[cardIndex].urlToImage}
          user={user}
          clickForward={clickForward}
          clickBack={clickBack}
        />
        
        <div className={style.footer__text}>
          Click ← or → for go forward or backward
        </div>
      </div>
    </>
  );
}