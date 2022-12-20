import style from './CardForm.module.css';
import { uploadFileApi, removeFileApi } from '../../http/moduleApi';
import { useRef } from 'react';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../redux/actions';

export const CardForm = (props) => {
  const card = props.cards.find(card => props._id === card._id);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const images = useSelector(state => {
    const { uploadImagesReducer } = state;
    return uploadImagesReducer.images;
  });

  const _images = [];
  if (images) {
    for (let i = 0; i < 4; ++i) {
      _images.push(images[i]);
    }
  }

  const backgroundImage = {
    background: 'url(' + `${REACT_APP_API_URL}/${user.login}/${props.imgUrl}` + ') 50%/cover no-repeat',
  };

  const handleChangeValue = e => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {
        changedCards.push({
          _id: card._id,
          value: e.target.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          isUploadImage: card.isUploadImage,
          searchQuery: card.searchQuery
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
          _id: card._id,
          value: card.value,
          translate: e.target.value,
          imgUrl: card.imgUrl,
          isUploadImage: card.isUploadImage,
          searchQuery: card.searchQuery
        });
      } else {
        changedCards.push(card);
      }
    });

    props.setCards(changedCards);
  }

  const handleDeleteCard = e => {
    const changedCards = [];
    let count = 0;

    props.cards.forEach(card => {
      console.log('card --> ', card);
      if(props._id !== card._id) {
        changedCards.push({
          _id: card._id,
          value:  card.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          isUploadImage: card.isUploadImage,
          searchQuery: card.searchQuery
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
            _id: card._id,
            value: card.value,
            translate: card.translate,
            imgUrl: data,
            isUploadImage: card.isUploadImage,
            searchQuery: card.searchQuery
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
      const data = await removeFileApi(card.imgUrl);
      
      const changedCards = [];

      props.cards.forEach(card => {        
        if (props._id === card._id) {
          changedCards.push({
            _id: card.id,
            value: card.value,
            translate: card.translate,
            imgUrl: '',
            isUploadImage: card.isUploadImage,
            searchQuery: card.searchQuery
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

  const onClickUploadImage = e => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {
        changedCards.push({
          _id: card._id,
          value: card.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          isUploadImage: !card.isUploadImage,
          searchQuery: card.value
        });
      } else {
        changedCards.push({
          _id: card._id,
          value: card.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          isUploadImage: false,
          searchQuery: card.value
        });
      }
    });

    props.setCards(changedCards);
  }

  const onClickEnter = (e) => {
    if(e.key === 'Enter') {
        dispatch(fetchImages(e.target.value));
    }
  }

  const handleChangeSearchQuery = (e) => {
    const changedCards = [];
    
    props.cards.forEach(card => {
      if (props._id === card._id) {
        changedCards.push({
          _id: card._id,
          value: card.value,
          translate: card.translate,
          imgUrl: card.imgUrl,
          isUploadImage: card.isUploadImage,
          searchQuery: e.target.value
        });
      } else {
        changedCards.push(card);
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
          {
            props.imgUrl ?
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
      {card.isUploadImage &&
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

        <div className={style.ImageCarousel}>
          <div>
            <button className={style.UIButton__wrapper}> ← </button>
            </div>
              {_images && 
              _images.map(img => (
                <div>
                  <img className={style.image__link} src={img}></img>
                </div>
                ))
              }
            {/*
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAILHdALH4vkOCgfcOkiS2QwTeKBGi-qHY_g&usqp=CAU" alt="" className={style.image__link} />

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAILHdALH4vkOCgfcOkiS2QwTeKBGi-qHY_g&usqp=CAU" alt="" className={style.image__link} />

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAILHdALH4vkOCgfcOkiS2QwTeKBGi-qHY_g&usqp=CAU" alt="" className={style.image__link} />

              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAILHdALH4vkOCgfcOkiS2QwTeKBGi-qHY_g&usqp=CAU" alt="" className={style.image__link} />
            */}
          <div>
            <button className={style.UIButton__wrapper}> → </button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}