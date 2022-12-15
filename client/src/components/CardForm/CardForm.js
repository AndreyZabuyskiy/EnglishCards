import style from './CardForm.module.css';
import { uploadFileApi, removeFileApi } from '../../http/moduleApi';
import { useRef } from 'react';
import { REACT_APP_API_URL } from '../../http/baseUrl';
import { useSelector } from 'react-redux';

export const CardForm = (props) => {
  const inputFileRef = useRef(null);

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

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
      if (props._id === card._id) {
        changedCards.push({
          _id: card._id,
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
    let count = 0;

    props.cards.forEach(card => {
      console.log('card --> ', card);
      if(props._id !== card._id) {
        changedCards.push({
          _id: card._id,
          value:  card.value,
          translate: card.translate,
          imgUrl: card.imgUrl
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
            imgUrl: data
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
            imgUrl: ''
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

  return (
    <div className={style.container}>
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
          <div className={style.add__image}>
            <input type='file' id={`file__${props._id}`}
              accept='image/*' onChange={handleChangeFile}
              ref={inputFileRef} />
            <label htmlFor={`file__${props._id}`}>
              <div className={style.icon__img}>🖼</div>
              <span>Изображение</span>
            </label>
          </div>
          }
      </div>
    </div>
  );
}