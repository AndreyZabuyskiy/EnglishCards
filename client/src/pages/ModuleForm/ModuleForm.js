import { useState } from 'react';
import style from './ModuleForm.module.css';
import { Navbar, NavbarModuleForm, HeaderModuleForm, ListCreateCards } from '../../components';
import { useDispatch } from 'react-redux';
import { createModule, updateModule } from '../../redux/actions';
import { CREATE_MODULE, HOME_ROUTE } from '../../utils/consts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchModuleByIdApi } from '../../http/moduleApi';

export const ModuleForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  
  let moduleState = [
    {
      _id: 0,
      value: '',
      translate: '',
      imgUrl: '',
      isUploadImage: false,
      searchQuery: ''
    },
    {
      _id: 1,
      value: '',
      translate: '',
      imgUrl: '',
      isUploadImage: false,
      searchQuery: ''
    },
    {
      _id: 2,
      value: '',
      translate: '',
      imgUrl: '',
      isUploadImage: false,
      searchQuery: ''
    },
    {
      _id: 3,
      value: '',
      translate: '',
      imgUrl: '',
      isUploadImage: false,
      searchQuery: ''
    },
    {
      _id: 4,
      value: '',
      translate: '',
      imgUrl: '',
      isUploadImage: false,
      searchQuery: ''
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
      }));
      navigate(`${HOME_ROUTE}`);
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