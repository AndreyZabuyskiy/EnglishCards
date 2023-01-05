import style from './FixedBannerLearnModule.module.css';

export const FixedBannerLearnModule = ({buttonMessage, onClickButton}) => {
  return (
    <div className={style.message__continue__wrapper}>
      <div className={style.message__continue}>
        <div>Чтобы продолжить, нажмите любую клавишу</div>
        <button onClick={onClickButton}>{ buttonMessage }</button>
      </div>
    </div>
  );
}