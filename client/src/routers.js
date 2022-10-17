import {
  REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE, SCREEN_CARDS, CREATE_MODULE,
  TEST_MODULE, LEARN_MODULE, WRITE_MODULE, SPELL_MODULE, EDIT_MODULE
} from './utils/consts';
import {
  AuthForm, Home, ViewModule, ScreenCards, ModuleForm,TestModule, WriteModule, LearnModule, SpellModule
} from './pages';

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: CREATE_MODULE,
    Component: ModuleForm
  },
  {
    path: EDIT_MODULE + '/:id',
    Component: ModuleForm
  },
  {
    path: TEST_MODULE + '/:id',
    Component: TestModule
  },
  {
    path: LEARN_MODULE + '/:id',
    Component: LearnModule
  },
  {
    path: WRITE_MODULE + '/:id',
    Component: WriteModule
  },
  {
    path: SPELL_MODULE + '/:id',
    Component: SpellModule
  }
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: AuthForm
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthForm
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