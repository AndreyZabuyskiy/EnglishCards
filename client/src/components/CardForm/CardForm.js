import style from './CardForm.module.css';

export const CardForm = (props) => {
  console.log('card form -->', props);

  return (
    <div className={style.container}>
      <div className={style.header__container}>
        <div className={style.header}>
          <div className={style.index}>{props.id + 1}</div>
          <div>
            <span>═</span>
            <button>🗑</button>
          </div>
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
        <div className={style.add__image}>
          <input type='file' id={`file__${props.index}`} accept='image/*' />
          <label for={`file__${props.index}`}>
            <div className={style.icon__img}>🖼</div>
            <span>Изображение</span>
          </label>
        </div>
      </div>
    </div>
  );
}