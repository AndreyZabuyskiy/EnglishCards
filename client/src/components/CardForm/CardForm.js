import style from './CardForm.module.scss';

export const CardForm = (props) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.index}>{props.index + 1} 🗑</div>
      </div>
      <div className={style.inputs}>
        <input type="text" className={style.input__value} />
        <input type="text" className={style.input__translate} />
      </div>
    </div>
  );
}