import style from './ViewModule.module.scss';
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleById } from "../../redux/actions";
import { Navbar, CardItemInner, UIMenuModule, SetPageInfo, ListCardElement } from '../../components';
import { EDIT_MODULE } from '../../utils/consts';

export const ViewModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModuleById(id));
  }, []);

  const moduleData = useSelector(state => {
    const { moduleReducer } = state;
    return moduleReducer.module;
  });

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  return (
    <>
      <Navbar />

      <div className={style.container}>
        <h1 className={style.title}> { moduleData?.module?.title } </h1>

        <div className={style.header}>
          <UIMenuModule id={id} />
          <CardItemInner id={id} moduleData={moduleData} user={user} />
        </div>

        <SetPageInfo user={user} />
        <ListCardElement moduleData={moduleData} user={user} />

        <div className={style.button__edit__module}>
          <button onClick={(e) => navigate(`${EDIT_MODULE}/${id}`)}>Добавить или удалить термины</button>
        </div>
      </div>
    </>
  )
}