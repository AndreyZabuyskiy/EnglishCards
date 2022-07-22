import style from './AddCardButton.module.css';

export const AddCardButton = (props) => (
  <button className={style.add__card}>
    <div className={style.index}>{props.index + 1}</div>
    <span className={style.content}> + Добавить карточку </span>
  </button>
);