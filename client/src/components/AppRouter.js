import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthForm } from '../pages/AuthForm';
import { Home } from '../pages/Home';
import { checkAuth } from '../redux/actions/authAction';
import { authRoutes, publicRoutes } from '../routers';

const AppRouter = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => {
    const { authReducer } = state;
    return authReducer.user;
  });

  const defaultPage = user && user?.isActivated ? <Home /> : <AuthForm />;
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Routes>
      {user && user?.isActivated && authRoutes.map(({ path, Component }) => 
        <Route key={ path } path={ path } element={<Component />} />
      )}

      {publicRoutes.map(({ path, Component }) => 
        <Route key={ path } path={ path } element={<Component />} />
      )}
      
      <Route path="*" element={ defaultPage } />
    </Routes>
  );
};

export default AppRouter;