import { useNavigate, useParams } from "react-router-dom";
import style from './ModeControls.module.css';
import { HOME_ROUTE } from "../../utils/consts";

export const ModeControls = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const widthCorrectAnswers = props.countCorrectAnswers / props.totalNumberCards * 100;
  const widthIncorrectAnswers = props.countIncorrectAnswers / props.totalNumberCards * 100;
  const widthCountAnswers = (props.cards.length - props.countCheckAnswers) / props.totalNumberCards * 100;

  return (
    <div className={style.container}>
      <div className={style.ModeControls__back}>
        <button onClick={() => navigate(`${HOME_ROUTE}/${id}`)} className={style.UILink}>
          <div>
            <span>←</span>
            <span className={style.text__back}>Back</span>
          </div>
        </button>
      </div>

      <div className={style.content}>
        <div className={style.modeName}>
          <span className={style.UIIcon}>✎</span>
          <span className={style.modeLabel}>Letter</span>
        </div>

        <div className={style.controls}>
          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__fill}`}>
              <div className={style.fill} style={{width: `${widthCountAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Remaining</div>
              <div>{ props.cards.length - props.countCheckAnswers }</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__invalid}`}>
              <div className={style.invalid} style={{width: `${widthIncorrectAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Wrong</div>
              <div>{ props.countIncorrectAnswers }</div>
            </div>
          </div>

          <div className={style.prograss__bar__container}>
            <div className={`${style.prograss__bar} ${style.prograss__bar__valid}`}>
              <div className={style.valid} style={{width: `${widthCorrectAnswers}%`}}></div>
            </div>
            <div className={style.labal}>
              <div>Correct</div>
              <div>{ props.countCorrectAnswers }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}