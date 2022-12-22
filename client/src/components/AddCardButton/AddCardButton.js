import style from './AddCardButton.module.css';

export const AddCardButton = (props) => {
  const clickAddCardButton = e => {
    const changedCards = [];

    props.cards.forEach(card => {
      changedCards.push(card);
    });

    changedCards.push({
      _id: props.cards.length,
      value: '',
      translate: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: ''
    });

    props.setCards(changedCards);
  }

  return (
    <button className={style.add__card} onClick={clickAddCardButton}>
      <div className={style.index}>{props.index + 1}</div>
      <span className={style.content}> + Добавить карточку </span>
    </button>
  )
};