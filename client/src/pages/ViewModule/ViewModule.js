import style from './ViewModule.module.scss';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleById } from '../../redux/actions/moduleAction';
import { Navbar, CardItemInner, UIMenuModule, SetPageInfo, ListCardElement } from '../../components';
import { EDIT_MODULE } from '../../utils/consts';
import { NavbarViewModule } from '../../components/NavbarViewModule/NavbarViewModule';

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

      <div className={`${style.container}`}>
        <h1 className={style.title}> { moduleData?.module?.title } </h1>

        <div className={`${style.header} ${style.container__column}`}>
          <UIMenuModule id={id} />
          <CardItemInner id={id} moduleData={moduleData} user={user} />
        </div>

        <NavbarViewModule title={moduleData?.module?.title} />

        <div className={`${style.container__column}`}>
          <SetPageInfo user={user} />
          <ListCardElement moduleData={moduleData} user={user} />
        </div>

        <div className={style.button__edit__module}>
          <button onClick={(e) => navigate(`${EDIT_MODULE}/${id}`)}>Create or delete words</button>
        </div>
      </div>
    </>
  )
}