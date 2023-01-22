import style from './NavbarModules.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVisitedModules } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import { useNavigate } from "react-router-dom";

export const NavbarModules = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVisitedModules());
  }, []);

  const { modules } = useSelector(state => {
    const { visitedModulesReducer } = state;
    return visitedModulesReducer;
  });

  console.log('NavbarModules modules -->', modules);

  return (
    <div className={style.container}>
      <div className={style.modules}>
        {modules.map((_module, index) => (
          <Link to={`${HOME_ROUTE}/${_module.module.id}`} className={style.module}>
            <div>{ _module.module.title }</div>
            <div>{ _module.user.login }</div>
          </Link>
        ))}
      </div>
      <div className={style.footer}>
        <Link to={`${HOME_ROUTE}`} className={style.link__to__modules}>Show all the modules</Link>
      </div>
    </div>
  );
}