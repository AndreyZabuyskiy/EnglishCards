import { useState } from 'react';
import style from './ModuleForm.module.css';
import { Navbar, NavbarModuleForm, HeaderModuleForm, ListCreateCards } from '../../components';
import { useDispatch } from 'react-redux';
import { createModule, updateModule } from '../../redux/actions';
import { CREATE_MODULE } from '../../utils/consts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchModuleByIdApi } from '../../http/moduleApi';

export const ModuleForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  let moduleState = [
    {
      _id: 0,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      _id: 1,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      _id: 2,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      _id: 3,
      value: '',
      translate: '',
      imgUrl: ''
    },
    {
      _id: 4,
      value: '',
      translate: '',
      imgUrl: ''
    }
  ];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState(moduleState);

  const url = window.location.href;
  const isCreateModule = url.split('/').slice(-1)[0] === CREATE_MODULE.substring(1);

  useEffect(() => {
    async function fetchModuleState() {
      if (!isCreateModule) {
        const response = await fetchModuleByIdApi(params.id);
        setCards(response.cards);
        setTitle(response.module.title);
        setDescription(response.module.description);
      }
    }

    fetchModuleState();
  }, []);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  }

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  }

  const clickCreateModule = e => {
    if (isCreateModule) {
      dispatch(createModule({
        title, description, cards
      }));
    } else {
      dispatch(updateModule(params.id, {
        title, description, cards
      }))
    }
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
            <button onClick={clickCreateModule}>
              { isCreateModule ? "Создать" : "Редактировать" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}