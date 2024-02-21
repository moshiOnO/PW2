import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import Axios from 'axios';
import Registro from './Registro';
import Usuarios from './Usuarios';

function App(){
 
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registro/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;