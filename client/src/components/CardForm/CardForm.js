import style from './CardForm.module.css';
import { uploadFileApi, removeFileApi } from '../../http/moduleApi';
import { useRef, useState } from 'react';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { clearImages, fetchImages } from '../../redux/actions';

export const CardForm = (props) => {
  const card = props.cards.find(card => props._id === card._id);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
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

  if (props.pathToFile) {
    backgroundImage = {
      background: 'url(' + `${REACT_APP_API_URL}/${user.login}/${props.pathToFile}` + ') 50%/cover no-repeat'
    };
  }
  if (props.urlToImage) {
    backgroundImage = {
      background: 'url(' + `${props.urlToImage}` + ') 50%/cover no-repeat'
    };
  }

  const handleChangeValue = e => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {        
        changedCards.push({
          ...card,
          value: e.target.value
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
      if (props._id === card._id) {
        changedCards.push({
          ...card,
          translate: e.target.value
        });
      } else {
        changedCards.push(card);
      }
    });

    props.setCards(changedCards);
  }

  const handleDeleteCard = e => {
    const changedCards = [];

    props.cards.forEach(card => {
      if(props._id !== card._id) {
        changedCards.push({
          ...card
        });
      }
    });

    props.setCards(changedCards);
  }

  const handleChangeFile = async (e) => {
    try {
      const data = await uploadFileApi(e.target.files[0]);
      const changedCards = [];

      props.cards.forEach(card => {        
        if (props._id === card._id) {
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

      props.setCards(changedCards);
    }catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  }

  const handleRemoveFile = async (e) => {
    try {      
      const card = props.cards[props._id];

      let data = '';
      if (card.pathToFile) {
        data = await removeFileApi(card.pathToFile);
      }
      
      const changedCards = [];
      props.cards.forEach(card => {        
        if (props._id === card._id) {
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

      props.setCards(changedCards);
    }catch (err) {
      console.warn(err);
      alert('Ошибка при удалении файла');
    }
  }

  const onClickUploadImage = e => {
    if (!card.isViewUploadImage) {
      dispatch(fetchImages(card.value));
    } else {
      dispatch(clearImages());
    }

    const changedCards = [];
    props.cards.forEach(card => {
      if (props._id === card._id) {
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

    props.setCards(changedCards);
    setSearchQueryError(card.value);
  }

  const onClickEnter = (e) => {
    if(e.key === 'Enter') {
      dispatch(fetchImages(e.target.value));
      setSearchQueryError(card.searchQuery);
    }
  }

  const handleChangeSearchQuery = (e) => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {
        changedCards.push({
          ...card,
          searchQuery: e.target.value
        });
      } else {
        changedCards.push(card);
      }
    });

    props.setCards(changedCards);
  }

  const onClickImage = _urlToImage => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {
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

    props.setCards(changedCards);
  }

  return (
    <div className={style.container}>
      <div className={style.container__card}>
        <div className={style.header__container}>
          <div className={style.header}>
            <div className={style.index}>{props.index + 1}</div>
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
          {props.pathToFile || props.urlToImage
          ?
            <div className={style.image__container} style={backgroundImage}>
              <button className={style.delete__img} onClick={handleRemoveFile}>🗑</button>                  
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
              value={props.searchQuery} onChange={handleChangeSearchQuery}
              onKeyDown={onClickEnter} />
            
          <div className={style.upload__your__image}>
            <input type='file' id={`file__${props._id}`}
              ref={inputFileRef} accept='image/*' onChange={handleChangeFile} />
            <label htmlFor={`file__${props._id}`}>
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
                  <button className={style.button__img} onClick={() => onClickImage(img)}>
                    <img src={img} alt="image"></img>
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