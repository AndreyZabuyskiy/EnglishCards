import style from './NavbarModuleNavigate.module.css';
import fileImage from '../../assets/file-image.png';
import { useNavigate } from 'react-router-dom';
import { LEARN_MODULE, SCREEN_CARDS, HOME_ROUTE } from '../../utils/consts';

export const NavbarModuleNavigate = ({ moduleId }) => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.item} onClick={() => navigate(`${LEARN_MODULE}/${moduleId}`)}>
        <img src={fileImage} alt='' />
        <p>Заучивание</p>
      </div>
      <div className={style.item} onClick={() => navigate(`${SCREEN_CARDS}/${moduleId}`)}>
        <img src={fileImage} alt='' />
        <p>Карточки</p>
      </div>
      <div className={style.item} onClick={() => navigate(`${SCREEN_CARDS}/${moduleId}`)}>
        <img src={fileImage} alt='' />
        <p>Подбор</p>
      </div>
      <div className={style.line}></div>
      <div className={style.item} onClick={() => navigate(`${HOME_ROUTE}`)}>Главная</div>
    </div>
  );
}