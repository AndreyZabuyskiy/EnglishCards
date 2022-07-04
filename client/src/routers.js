import Login from './pages/Login';
import Registration from './pages/Register';
import Home from './pages/Home'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE } from './utils/consts';

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home
  }
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Registration
  },
  {
    path: LOGIN_ROUTE,
    Component: Login
  }
]