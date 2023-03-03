import style from './AddCardButton.module.css';
import React from 'react';

export const AddCardButton = React.memo(({ index, setCards }) => {
  const clickAddCardButton = () => {
    setCards(prev => {
      const cards = prev.slice(0);
      cards.push({
        _id: cards.length,
        term: '',
        definition: '',
        isViewUploadImage: false,
        searchQuery: '',
        pathToFile: '',
        isUrlImage: false,
        urlToImage: '',
        position: cards.length
      });

      return cards;
    });
  }

  return (
    <button className={style.add__card} onClick={clickAddCardButton}>
      <div className={style.index}>{index + 1}</div>
      <span className={style.content}> + Add card </span>
    </button>
  )
});