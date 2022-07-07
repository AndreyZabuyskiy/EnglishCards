import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import { Login } from '../pages/Login';
import { checkAuth } from '../redux/actions';
import { authRoutes, publicRoutes } from '../routers';

const AppRouter = () => {
  const user = useSelector(state => {
    const { auth } = state;
    return auth.user;
  });

  const defaultPage = user !== undefined ? <Home /> : <Login />;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Routes>
      {user && authRoutes.map(({ path, Component }) => 
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