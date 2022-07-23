import style from './CardForm.module.scss';

export const CardForm = (props) => {
  return (
    <div className={style.container}>
      <div className={style.header__container}>
        <div className={style.header}>
          <div className={style.index}>{props.index + 1}</div>
          <div>🗑</div>
        </div>
      </div>
      <div className={style.inputs}>
        <div className={style.input__value}>
          <input type="text" />
          <p>Термин</p>
        </div>
        <div className={style.input__translate}>
          <input type="text" />
          <p>Определение</p>
        </div>
      </div>
    </div>
  );
}