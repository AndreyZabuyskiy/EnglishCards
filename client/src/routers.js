import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home'
import { ViewModule } from './pages/ViewModule';
import { ScreenCards } from './pages/ScreenCards';
import { REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, SCREEN_CARDS, CREATE_MODULE } from './utils/consts';
import { ModuleForm } from './pages/ModuleForm/ModuleForm';

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: CREATE_MODULE,
    Component: ModuleForm
  }
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Register
  },
  {
    path: LOGIN_ROUTE,
    Component: Login
  },
  {
    path: HOME_ROUTE + '/:id',
    Component: ViewModule
  },
  {
    path: SCREEN_CARDS + '/:id',
    Component: ScreenCards
  }
]