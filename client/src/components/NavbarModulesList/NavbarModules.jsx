import style from './NavbarModules.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVisitedModules } from '../../redux/actions/modulesAction';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';

export const NavbarModules = ({ visibleModules }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (visibleModules) {
      dispatch(fetchVisitedModules());
    }
  }, [visibleModules]);

  const { modules } = useSelector(state => {
    const { visitedModulesReducer } = state;
    return visitedModulesReducer;
  });

  return (
    <div className={style.container}>
      <div className={style.modules}>
        {modules && modules.length > 0 && modules.map((_module, index) => (
          <Link to={`${HOME_ROUTE}/${_module?.module?._id}`}
            className={style.module} key={index}>
            <div className={style.title}>{ _module?.module?.title }</div>
            <div className={style.email}>{ _module?.user?.email }</div>
          </Link>
        ))}
      </div>
      <div className={style.footer}>
        <Link to={`${HOME_ROUTE}`} className={style.link__to__modules}>Show all the modules</Link>
      </div>
    </div>
  );
}