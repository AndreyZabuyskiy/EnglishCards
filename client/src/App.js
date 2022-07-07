import './styles/App.css';
import AppRouter from './components/AppRouter';
import { Navbar } from './components/Navbar'


function App() {
  return (
    <>
     <Navbar />

      <div className="container">
        <AppRouter />
      </div>
    </>
  );
}

export default App;