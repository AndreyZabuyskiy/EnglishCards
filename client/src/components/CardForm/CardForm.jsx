import style from './CardForm.module.css';
import { useRef, useState } from 'react';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useSelector } from 'react-redux';
import React from 'react';

export const CardForm = ({ index, _id, value, translate, pathToFile, searchQuery, cards,
  urlToImage, handleChangeValue, handleChangeTranslate, handleDeleteCard, handleChangeFile,
  handleRemoveFile, uploadImage, handleChangeSearchQuery, selectImage, fetchImagesCard }) => {
  const card = cards.find(card => _id === card._id);
  const inputFileRef = useRef(null);
  const [searchQueryError, setSearchQueryError] = useState(card.value);

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

  const onClickUploadImage = e => {
    uploadImage(_id);
    setSearchQueryError(card.value);
  }

  const onClickEnter = (e) => {
    if(e.key === 'Enter') {
      fetchImagesCard(e);
      setSearchQueryError(card.searchQuery);
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
              <button onClick={() => handleDeleteCard(_id)}>🗑</button>
            </div>
          </div>
        </div>
        <div className={style.inputs}>
          <div className={style.input__value}>
            <input type="text" value={value}
              onChange={(e) => handleChangeValue(e, _id)} />
            <p>Термин</p>
          </div>
          <div className={style.input__translate}>
            <input type="text" value={translate}
              onChange={(e) => handleChangeTranslate(e, _id)} />
            <p>Определение</p>
          </div>
          {pathToFile || urlToImage
          ?
            <div className={style.image__container} style={backgroundImage}>
              <button className={style.delete__img} onClick={() => handleRemoveFile(_id)}>
                🗑
              </button>                  
            </div>
          :
            <div onClick={onClickUploadImage} className={style.add__image}>
              <label>
                <div className={style.icon__img}>🖼</div>
                <span>Изображение</span>
              </label>
            </div>
          }
        </div>
      </div>
      {card.isViewUploadImage &&
      <div className={style.UploadImages}>
        <div className={style.UploadImages__header}>
            <input id="search" className={style.text__input}
              type="text" placeholder='Search by images'
              value={searchQuery} onChange={handleChangeSearchQuery}
              onKeyDown={onClickEnter} />
            
          <div className={style.upload__your__image}>
            <input type='file' id={`file__${_id}`}
              ref={inputFileRef} accept='image/*' onChange={(e) => handleChangeFile(e, _id)} />
            <label htmlFor={`file__${_id}`}>
              <div>Or upload your image</div>
            </label>
          </div>  
        </div>

        {card.searchQuery !== ""
        ?
          _images.length !== 0
          ?
            <div className={style.ImageCarousel}>
              <div>
                <button className={style.UIButton__wrapper}> ← </button>
              </div>
              {_images.map(img => (
                <div>
                  <button className={style.button__img} onClick={() => selectImage(img, _id)}>
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
}