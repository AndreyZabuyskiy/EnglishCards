import React, { useState } from 'react';
import style from './ModuleForm.module.css';
import { Navbar, NavbarModuleForm, HeaderModuleForm, ListCreateCards } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createModule, updateModule, clearCreateModuleReducer } from '../../redux/actions/moduleFormAction';
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
      term: '',
      definition: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: '',
      position: 0
    },
    {
      _id: 1,
      term: '',
      definition: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: '',
      position: 1
    },
    {
      _id: 2,
      term: '',
      definition: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: '',
      position: 2
    },
    {
      _id: 3,
      term: '',
      definition: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: '',
      position: 3
    },
    {
      _id: 4,
      term: '',
      definition: '',
      isViewUploadImage: false,
      searchQuery: '',
      pathToFile: '',
      isUrlImage: false,
      urlToImage: '',
      position: 4
    }
  ];

  const { isCreateOrUpdateModule, newModuleId } = useSelector(state => {
    const { createModuleReducer } = state;
    return createModuleReducer;
  });

  if (isCreateOrUpdateModule) {
    dispatch(clearCreateModuleReducer());
    navigate(`${HOME_ROUTE}/${newModuleId}`);
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState(moduleState);

  const url = window.location.href;
  const isCreateModule = url.split('/').slice(-1)[0] === CREATE_MODULE.substring(1);

  useEffect(() => {
    async function fetchModuleState() {
      if (!isCreateModule) {
        const response = await fetchModuleByIdApi(params.id);
        setCards(response.data.cards);
        setTitle(response.data.module.title);
        setDescription(response.data.module.description);
      }
    }

    fetchModuleState();
  }, []);

  const handleChangeTitle = React.useCallback((e) => {
    setTitle(e.target.value);
  }, [])

  const handleChangeDescription = React.useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const clickCreateModule = e => {
    if (isCreateModule) {
      dispatch(createModule({
        title, description, cards
      }));
    } else {
      dispatch(updateModule(params.id, {
        title, description, cards
      }));
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
              { isCreateModule ? "Create" : "Edit" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}