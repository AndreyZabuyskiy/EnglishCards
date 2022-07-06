import './styles/App.css';
import AppRouter from './components/AppRouter';
import { useEffect } from 'react';
import { checkAuth } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
  return (
    <div className="container">
      <AppRouter />
    </div>
  );
}

export default App;