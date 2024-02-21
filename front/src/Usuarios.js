import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';

function Usuarios() {
    const[userList, setUList] = useState([]);

    const get = () =>{
        Axios.get("http://localhost:3001/getU",{
        }).then((resp)=>{
            setUList(resp.data);
        })
    }

    const del = (nomUD) =>{
        Axios.delete(`http://localhost:3001/delete/${nomUD}`,{
        }).then(()=>{
            alert("informaión enviada");
        })
    }

  return (
    <>
    <button className="btn btn-primary" onClick={get}>Mostrar usuarios</button>
    
    {
        userList.map((val, key)=>{
            return(
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>{val.name}</h5>
                <p className='card-text'>{val.email}</p>
            </div>
            <div>
                <button className='btn btn-danger' onClick={()=>{del(val.name)}}>Eliminar</button>
            </div>
        </div>
            )
        })
    }
    
    
    </>
  )
}

export default Usuarios