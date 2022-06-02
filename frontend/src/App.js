
//import './App.css';

//importamos los componentes
import CompShowUsers from './pages/users/showUsers';
import CompCreateUser from './pages//users/createUser';
import CompEditUser from './pages//users/editUser';
import CompPagos from './pages/pagos/pagos';
import VerSaldo  from './pages/saldo/ver_saldo';
import React from 'react'
import ReactDOM from 'react-dom'

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
            <Route path='/versaldo' element={ <VerSaldo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;