import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import { Login } from '../pages/Login';
import { authRoutes, publicRoutes } from '../routers';

const AppRouter = () => {
  const isAuth = true;
  const defaultPage = isAuth ? <Home /> : <Login />;
  
  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component }) => 
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