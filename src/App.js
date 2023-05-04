import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import ShowDetails from './components/ShowDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shows/:id' element={<ShowDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
