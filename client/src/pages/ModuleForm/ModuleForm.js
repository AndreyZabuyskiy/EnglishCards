import { useState } from 'react';
import style from './ModuleForm.module.css';
import { Navbar, NavbarModuleForm, HeaderModuleForm, ListCreateCards } from '../../components';

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
          <ListCreateCards cards={cards} />
          
          <div className={style.button__create__module}>
            <button>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
}