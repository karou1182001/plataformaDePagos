
import './App.css';

//importamos los componentes
import CompShowUsers from './pages/showUsers';
import CompCreateUser from './pages/createUser';
import CompEditUser from './pages/editUser';
import CompPagos from './pages/pagos';
//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';





function App() {




  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <CompShowUsers />} />
            <Route path='/pagos' element={ <CompPagos />} />
            <Route path='/create' element={ <CompCreateUser />} />
            <Route path='/edit/:id' element={ <CompEditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;