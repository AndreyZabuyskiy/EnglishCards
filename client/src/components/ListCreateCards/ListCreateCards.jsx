import { AddCardButton } from "../AddCardButton/AddCardButton";
import { CardForm } from "../CardForm/CardForm";
import React from "react";
import { useDispatch } from "react-redux";
import { uploadFileApi, removeFileApi } from '../../http/moduleApi';
import { clearImages, fetchImages } from '../../redux/actions/moduleFormAction';

export const ListCreateCards = ({ cards, setCards }) => {
  const dispatch = useDispatch();

  const handleChangeValue = (e, _id) => {
    const changedCards = [];
    
    cards.forEach(card => {
      if (_id === card._id) {
        changedCards.push({
          ...card,
          value: e.target.value
        });
      } else {
        changedCards.push(card);
      }
    });

    setCards(changedCards);
  }

  const handleChangeTranslate = (e, _id) => {
    const changedCards = [];

    cards.forEach(card => {
      if (_id === card._id) {
        changedCards.push({
          ...card,
          translate: e.target.value
        });
      } else {
        changedCards.push(card);
      }
    });

    setCards(changedCards);
  }
  
  const handleDeleteCard = _id => {
    const changedCards = [];

    cards.forEach(card => {
      if (_id !== card._id) {
        changedCards.push({
          ...card
        });
      }
    });

    setCards(changedCards);
  }

  const handleChangeFile = async (e, _id) => {
    try {
      const data = await uploadFileApi(e.target.files[0]);
      const changedCards = [];

      cards.forEach(card => {
        if (_id === card._id) {
          changedCards.push({
            ...card,
            pathToFile: data,
            isUrlImage: false,
            urlToImage: ''
          });
        } else {
          changedCards.push(card);
        }
      });

      setCards(changedCards);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  }

  const handleRemoveFile = async (_id) => {
    try {
      const card = cards[_id];

      if (card.pathToFile) {
        await removeFileApi(card.pathToFile);
      }
      
      const changedCards = [];
      cards.forEach(card => {
        if (_id === card._id) {
          changedCards.push({
            ...card,
            pathToFile: '',
            isUrlImage: false,
            urlToImage: ''
          });
        } else {
          changedCards.push(card);
        }
      });

      setCards(changedCards);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удалении файла');
    }
  }

  const uploadImage = _id => {
    const card = cards.find(card => _id === card._id);

    if (!card.isViewUploadImage) {
      dispatch(fetchImages(card.value));
    } else {
      dispatch(clearImages());
    }

    const changedCards = [];
    cards.forEach(card => {
      if (_id === card._id) {
        changedCards.push({
          ...card,
          isViewUploadImage: !card.isViewUploadImage,
          searchQuery: card.value
        });
      } else {
        changedCards.push({
          ...card,
          isViewUploadImage: false,
          searchQuery: card.value
        });
      }
    });

    setCards(changedCards);
  }

  const handleChangeSearchQuery = (e, _id) => {
    const changedCards = [];
    
    cards.forEach(card => {
      if (_id === card._id) {
        changedCards.push({
          ...card,
          searchQuery: e.target.value
        });
      } else {
        changedCards.push(card);
      }
    });

    setCards(changedCards);
  }

  const selectImage = (_urlToImage, _id) => {
    console.log('_urlToImage', _urlToImage);
    const changedCards = [];
    
    cards.forEach(card => {
      if (_id === card._id) {
        changedCards.push({
          ...card,
          isViewUploadImage: !card.isViewUploadImage,
          searchQuery: card.value,
          pathToFile: '',
          isUrlImage: true,
          urlToImage: _urlToImage
        });
      } else {
        changedCards.push({
          ...card,
          isViewUploadImage: false,
          searchQuery: card.value,
          pathToFile: ''
        });
      }
    });

    setCards(changedCards);
  }

  const fetchImagesCard = (e) => dispatch(fetchImages(e.target.value));

  return (
    <div>
      {
        cards.map((card, index) => (
          <CardForm key={card._id} index={index} {...card} cards={cards}
            handleChangeValue={handleChangeValue} handleChangeTranslate={handleChangeTranslate}
            handleDeleteCard={handleDeleteCard} handleChangeFile={handleChangeFile}
            handleRemoveFile={handleRemoveFile} handleChangeSearchQuery={handleChangeSearchQuery}
            uploadImage={uploadImage} selectImage={selectImage} fetchImagesCard={fetchImagesCard} />
        ))
      }

      <AddCardButton
        index={cards.length}
        cards={cards}
        setCards={setCards} />
    </div>
  );
}