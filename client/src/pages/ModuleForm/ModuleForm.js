import { useState } from 'react';
import style from './ModuleForm.module.css';
import { Navbar, NavbarModuleForm, HeaderModuleForm, ListCreateCards } from '../../components';
import { useDispatch } from 'react-redux';
import { createModule } from '../../redux/actions';

export const ModuleForm = () => {
  const dispatch = useDispatch();


  const initialState = [
    {
      id: 0,
      value: 'skin',
      translate: 'кожа',
      imgUrl: ''
    },
    {
      id: 1,
      value: 'lips',
      translate: 'губы',
      imgUrl: ''
    },
    {
      id: 2,
      value: 'chin',
      translate: 'подбородок',
      imgUrl: ''
    },
    {
      id: 3,
      value: 'shoulder',
      translate: 'плечо',
      imgUrl: ''
    },
    {
      id: 4,
      value: 'cheek',
      translate: 'щека',
      imgUrl: ''
    }
  ]

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState(initialState);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  }

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  }

  const clickCreateModule = e => {
    dispatch(createModule({
      title, description, cards
    }));
  }

  return (
    <div>
      <Navbar />

      <div className={style.container}>
        <NavbarModuleForm />
        
        <div className={style.content}>
          <HeaderModuleForm title={title} setTitle={handleChangeTitle}
            description={description} setDescription={handleChangeDescription} />
          <ListCreateCards cards={cards} setCards={setCards} />
          
          <div className={style.button__create__module}>
            <button onClick={clickCreateModule}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
}