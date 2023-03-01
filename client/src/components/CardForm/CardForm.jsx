import style from './CardForm.module.css';
import React, { useRef, useState } from 'react';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFileApi, removeFileApi } from '../../http/moduleApi';
import { clearImages, fetchImages } from '../../redux/actions/moduleFormAction';

export const CardForm = React.memo(({ index, _id, term, definition, pathToFile, searchQuery, urlToImage,
  isViewUploadImage, setCards }) => {
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [searchQueryError, setSearchQueryError] = useState(term);

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const images = useSelector(state => {
    const { uploadImagesReducer } = state;
    return uploadImagesReducer.images;
  });

  let _images = [];
  if (images.length) {
    for (let i = 0; i < 4; ++i) {
      _images.push(images[i]);
    }
  }

  let backgroundImage = null;

  if (pathToFile) {
    backgroundImage = {
      background: `url(${REACT_APP_API_URL}/${user.login}/${pathToFile}) 50%/cover no-repeat`
    };
  }
  if (urlToImage) {
    backgroundImage = {
      background: `url(${urlToImage}) 50%/cover no-repeat`
    };
  }

  const handleChangeTerm = (e) => {
    setCards(prev => {
      const indexCard = prev.findIndex(card => card._id === _id);
      const card = prev[indexCard];

      const updatedCard = {
        ...card,
        term: e.target.value
      }

      const cardsOne = prev.slice(0, indexCard);
      const cardsTwo = prev.slice(indexCard + 1);
      const newCards = [...cardsOne, updatedCard, ...cardsTwo];

      return newCards;
    })
  }

  const handleChangeDefinition = (e) => {
    setCards(prev => {
      const indexCard = prev.findIndex(card => card._id === _id);
      const card = prev[indexCard];

      const updatedCard = {
        ...card,
        definition: e.target.value
      }

      const cardsOne = prev.slice(0, indexCard);
      const cardsTwo = prev.slice(indexCard + 1);
      const newCards = [...cardsOne, updatedCard, ...cardsTwo];

      return newCards;
    });
  }

  const handleDeleteCard = () => {
    setCards(prev => {
      const indexCard = prev.findIndex(card => card._id === _id);

      const cardsOne = prev.slice(0, indexCard);
      const cardsTwo = prev.slice(indexCard + 1);
      const newCards = [...cardsOne, ...cardsTwo];

      return newCards;
    });
  }

  const handleChangeFile = async (e) => {
    try {
      const data = await uploadFileApi(e.target.files[0]);
      setCards(prev => {
        const indexCard = prev.findIndex(card => card._id === _id);
        const card = prev[indexCard];

        const updatedCard = {
          ...card,
          pathToFile: data,
          isUrlImage: false,
          urlToImage: ''
        }

        const cardsOne = prev.slice(0, indexCard);
        const cardsTwo = prev.slice(indexCard + 1);
        const newCards = [...cardsOne, updatedCard, ...cardsTwo];

        return newCards;
      });
    } catch (err) {
      console.warn(err);
      alert('File upload error!');
    }
  }

  const handleRemoveFile = async () => {
    try {
      if (pathToFile) {
        await removeFileApi(pathToFile);
      }

      setCards(prev => {
        const indexCard = prev.findIndex(card => card._id === _id);
        const card = prev[indexCard];

        const updatedCard = {
          ...card,
          pathToFile: '',
          isUrlImage: false,
          urlToImage: ''
        }

        const cardsOne = prev.slice(0, indexCard);
        const cardsTwo = prev.slice(indexCard + 1);
        const newCards = [...cardsOne, updatedCard, ...cardsTwo];

        return newCards;
      });
    } catch (err) {
      console.warn(err);
      alert('Error when deleting this file');
    }
  }

  const handleChangeSearchQuery = (e) => {
    setCards(prev => {
      const indexCard = prev.findIndex(card => card._id === _id);
      const card = prev[indexCard];

      const updatedCard = {
        ...card,
        searchQuery: e.target.value
      }

      const cardsOne = prev.slice(0, indexCard);
      const cardsTwo = prev.slice(indexCard + 1);
      const newCards = [...cardsOne, updatedCard, ...cardsTwo];
      
      return newCards;
    });
  }

  const selectImage = (_urlToImage) => {
    setCards(prev => {
      const changedCards = [];
    
      prev.forEach(card => {
        if (_id === card._id) {
          changedCards.push({
            ...card,
            isViewUploadImage: !card.isViewUploadImage,
            searchQuery: card.term,
            pathToFile: '',
            isUrlImage: true,
            urlToImage: _urlToImage
          });
        } else {
          changedCards.push({
            ...card,
            isViewUploadImage: false,
            searchQuery: card.term,
            pathToFile: ''
          });
        }
      });

      return changedCards;
    });
  }

  const fetchImagesCard = (e) => dispatch(fetchImages(e.target.value));

  const onClickUploadImage = () => {
    setCards(prev => {
      const cardIndex = prev.findIndex(card => _id === card._id);
      const card = prev[cardIndex];
      
      if (!card.isViewUploadImage) {
        dispatch(fetchImages(card.term));
      } else {
        dispatch(clearImages());
      }

      const changedCards = [];
      prev.forEach(card => {
        if (_id === card._id) {
          changedCards.push({
            ...card,
            isViewUploadImage: !card.isViewUploadImage,
            searchQuery: card.term
          });
        } else {
          changedCards.push({
            ...card,
            isViewUploadImage: false,
            searchQuery: card.value
          });
        }
      });

      return changedCards;
    });

    setSearchQueryError(term);
  }

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      fetchImagesCard(e);
      setSearchQueryError(searchQuery);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.container__card}>
        <div className={style.header__container}>
          <div className={style.header}>
            <div className={style.index}>{index + 1}</div>
            <div>
              <span>═</span>
              <button onClick={handleDeleteCard}>🗑</button>
            </div>
          </div>
        </div>
        <div className={style.inputs}>
          <div className={style.input__value}>
            <input type="text" value={term}
              onChange={handleChangeTerm} />
            <p>Term</p>
          </div>
          <div className={style.input__translate}>
            <input type="text" value={definition}
              onChange={handleChangeDefinition} />
            <p>Definition</p>
          </div>
          {pathToFile || urlToImage
            ?
            <div className={style.image__container} style={backgroundImage}>
              <button className={style.delete__img} onClick={handleRemoveFile}>
                🗑
              </button>
            </div>
            :
            <div onClick={onClickUploadImage} className={style.add__image}>
              <label>
                <div className={style.icon__img}>🖼</div>
                <span>Image</span>
              </label>
            </div>
          }
        </div>
      </div>
      {isViewUploadImage &&
        <div className={style.UploadImages}>
          <div className={style.UploadImages__header}>
            <input id="search" className={style.text__input}
              type="text" placeholder='Search by images'
              value={searchQuery} onChange={handleChangeSearchQuery}
              onKeyDown={onClickEnter} />
            
            <div className={style.upload__your__image}>
              <input type='file' id={`file__${_id}`}
                ref={inputFileRef} accept='image/*' onChange={handleChangeFile} />
              <label htmlFor={`file__${_id}`}>
                <div>Or upload your image</div>
              </label>
            </div>
          </div>

          {searchQuery !== ""
            ?
            _images.length !== 0
              ?
              <div className={style.ImageCarousel}>
                <div>
                  <button className={style.UIButton__wrapper}> ← </button>
                </div>
                {_images.map((img, index) => (
                  <div key={index}>
                    <button className={style.button__img} onClick={() => selectImage(img)}>
                      <img src={img} alt="_image" />
                    </button>
                  </div>
                ))}
                <div>
                  <button className={style.UIButton__wrapper}> → </button>
                </div>
              </div>
              :
              <div className={style.ImageCarousel}>
                <p>Don't find images for "{searchQueryError}"</p>
              </div>
            :
            <div className={style.ImageCarousel}></div>
          }
        </div>
      }
    </div>
  );
});