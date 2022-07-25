import style from './ViewModule.module.scss';
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleById } from "../../redux/actions";
import { Navbar } from "../../components/Navbar";
import { CardItemInner } from '../../components/CardItemInner';
import { UIMenuModule } from '../../components/UIMenuModule/UIMenuModule';
import { SetPageInfo } from '../../components/SetPageInfo';
import { ListCardElement } from '../../components/ListCardElement';

export const ViewModule = () => {
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
          <UIMenuModule />
          <CardItemInner id={id} moduleData={moduleData} user={user} />
        </div>

        <SetPageInfo user={user} />
        <ListCardElement moduleData={moduleData} />
      </div>
    </>
  )
}