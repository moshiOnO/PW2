import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
//import de páginas
import Registro from './Registro';
import Usuarios from './Usuarios';
import Dashboard from './Dashboard';
import InicioSesion from './is';
import Perfil from './perfil';
import Publicacion from './publicacion';
import Editperfil from './editPerfil';
import Stats from './stats';
import Editpost from './editpost';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InicioSesion />}></Route>
        <Route path='/register' element={<Registro />}></Route>
        <Route path='/usuarios' element={<Usuarios />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/perfil' element={<Perfil />}></Route>
        <Route path='/publicacion' element={<Publicacion />}></Route>
        <Route path='/editperfil' element={<Editperfil />}></Route>
        <Route path='/stats' element={<Stats />}></Route>
        <Route path='/editpost' element={<Editpost />}></Route>

      </Routes>
    </BrowserRouter>
  );
}



export default App;