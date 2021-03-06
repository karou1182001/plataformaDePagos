
//import './App.css';

//importamos los componentes
import CompShowUsers from './pages/users/showUsers';
import CompCreateUser from './pages//users/createUser';
import CompEditUser from './pages//users/editUser';
import CompPagos from './pages/pagos/pagos';
import VerSaldo  from './pages/saldo/ver_saldo';
import VerSaldoPSE from './pages/saldo/ver_saldoPSE';
import RegistrarTarjetaPSE from './pages/saldo/registrar_tarjeta_PSE';
import RegistrarUsuario from './pages/registro/registrar_usuario';
import RegistrarTarjeta from './pages/saldo/registrar_tarjeta';
import React from 'react'
import ReactDOM from 'react-dom'

//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <CompPagos />} />
            <Route path='/users' element={ <CompShowUsers />} />
            <Route path='/pagos' element={ <CompPagos />} />
            <Route path='/create' element={ <CompCreateUser />} />
            <Route path='/edit/:id' element={ <CompEditUser />} />
            <Route path='/versaldo/:id' element={ <VerSaldo />} />
            <Route path='/versaldo/versaldoPSE/:id' element={ <VerSaldoPSE />} />
            <Route path='/registrartarjeta/:id' element={ <RegistrarTarjeta />} />
            <Route path='/registrartarjetaPSE/:id' element={ <RegistrarTarjetaPSE />} />
            <Route path='/registrarusuario' element={ <RegistrarUsuario/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;