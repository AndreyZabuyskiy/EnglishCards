import style from './CardForm.module.css';

export const CardForm = (props) => {
  const handleChangeValue = e => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props.id === card.id) {
        changedCards.push({
          id: card.id,
          value: e.target.value,
          translate: card.translate,
          imgUrl: card.imgUrl
        });
      } else {
        changedCards.push(card);
      }
    });

    props.setCards(changedCards);
  }

  const handleChangeTranslate = e => {
    const changedCards = [];

    props.cards.forEach(card => {
      if (props.id === card.id) {
        changedCards.push({
          id: card.id,
          value: card.value,
          translate: e.target.value,
          imgUrl: card.imgUrl
        });
      } else {
        changedCards.push(card);
      }
    });

    props.setCards(changedCards);
  }

  const handleDeleteCard = e => {
    const changedCards = [];
    let index = 0;

    props.cards.forEach(card => {
      if(props.id !== card.id) {
        changedCards.push({
          id: index++,
          value:  card.value,
          translate: card.translate,
          imgUrl: card.imgUrl
        });
      }
    });

    props.setCards(changedCards);
  }

  return (
    <div className={style.container}>
      <div className={style.header__container}>
        <div className={style.header}>
          <div className={style.index}>{props.id + 1}</div>
          <div>
            <span>═</span>
            <button onClick={handleDeleteCard}>🗑</button>
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