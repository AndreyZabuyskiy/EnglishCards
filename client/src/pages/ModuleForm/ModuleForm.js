import style from './ModuleForm.module.css';
import { Navbar } from '../../components/Navbar';
import { NavbarModuleForm } from '../../components/NavbarModuleForm';
import { CardForm } from '../../components/CardForm/CardForm';
import { useState } from 'react';
import { AddCardButton } from '../../components/AddCardButton/AddCardButton';
import { ImageUploadButton } from '../../components/ImageUploadButton';
import { HeaderModuleForm } from '../../components/HeaderModuleForm';

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
          <HeaderModuleForm />

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