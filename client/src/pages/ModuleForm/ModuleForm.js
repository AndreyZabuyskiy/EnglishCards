import style from './ModuleForm.module.css';
import { Navbar } from '../../components/Navbar';
import { NavbarModuleForm } from '../../components/NavbarModuleForm';
import { CardForm } from '../../components/CardForm/CardForm';
import { useState } from 'react';
import { AddCardButton } from '../../components/AddCardButton/AddCardButton';
import { ImageUploadButton } from '../../components/ImageUploadButton';

export const ModuleForm = () => {
  const initialState = [
    {
      id: 0,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      id: 1,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      id: 2,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      id: 3,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      id: 4,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      id: 5,
      value: '',
      translate: '',
      imgUrl: ''
    },
  ]

  const [cards, setCards] = useState(initialState);

  return (
    <div>
      <Navbar />

      <div className={style.container}>
        <NavbarModuleForm />
        
        <div className={style.content}>
          <div className={style.header__content}>
            <div className={style.input}>
              <input id="title"
                className={style.text__input}
                type="text" placeholder='Введите название' />
              <label for="title" className={style.label}>Название</label>
            </div>
            <input id={"description"}
              className={style.text__input}
              type="text"
              placeholder='Добавьте описание...' />
            <label for="description" className={style.label}>Описание</label>
          </div>

          <div className={style.container__permissions}>
            <div className={style.permissions}>
              <div className={style.permission}>
                <div>
                  <span>Видно всем</span>
                </div>
                <div>
                  <button>Изменить</button>
                </div>
              </div>
              <div className={style.permission}>
                <div>
                  <span>Редактируется только мной</span>
                </div>
                <div>
                  <button>Изменить</button>
                </div>
              </div>
            </div>
            <div className={style.wrapper}>
              <button>⇆</button>
            </div>
          </div>

          <ImageUploadButton />

          {
            cards.map((card, index) => (
              <CardForm index={index}
                id={card.id}
                value={card.value}
                translate={card.translate}
                imgUrl={card.imgUrl}
              />
            ))
          }

          <AddCardButton index={cards.length} />

          <div className={style.button__create__module}>
            <button>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
}