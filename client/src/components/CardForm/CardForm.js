import style from './CardForm.module.css';

export const CardForm = (props) => {
  const handleChangeValue = e => {
    const changedCards = [];

    for (let i = 0; i < props.cards.length; ++i) {
      if (props.id === i) {
        changedCards.push({
          id: props.cards[i].id,
          value: e.target.value,
          translate: props.cards[i].translate,
          imgUrl: props.cards[i].imgUrl
        });
      } else {
        changedCards.push(props.cards[i]);
      }
    }

    props.setCards(changedCards);
  }

  const handleChangeTranslate = e => {
    const changedCards = [];

    for (let i = 0; i < props.cards.length; ++i) {
      if (props.id === i) {
        changedCards.push({
          id: props.cards[i].id,
          value:  props.cards[i].value,
          translate: e.target.value,
          imgUrl: props.cards[i].imgUrl
        });
      } else {
        changedCards.push(props.cards[i]);
      }
    }

    props.setCards(changedCards);
  }

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
          <input type="text" value={props.value} onChange={handleChangeValue} />
          <p>Термин</p>
        </div>
        <div className={style.input__translate}>
          <input type="text" value={props.translate} onChange={handleChangeTranslate} />
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