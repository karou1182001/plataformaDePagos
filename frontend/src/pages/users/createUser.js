import '../../App.css';
import React from 'react'
import { useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const URI= "http://localhost:3001/users/";

function CompCreateUser(){
    /*--------------------VARIABLES------------------------- */
    const [userName, setUserName] = useState('');
    const navigate= useNavigate();

    

    /*------------------MÉTODOS-------------------------------- */
    //procedimiento guardar
    const createUser = async (e) => {
        e.preventDefault()
        await axios.post(URI, {userName: userName})
        //Nos manda a la ruta principal
        navigate('/')
    }   



    /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        <div>
        <h3>Create User</h3>
        <form onSubmit={createUser}>
             <div className='mb-3'>
                 <label className='form-label'>Nombre de usuario</label>
                 <input
                     value={userName}
                     onChange={ (e)=> setUserName(e.target.value)} 
                     type="text"
                     className='form-control'
                 />
              </div> 
              <button type='submit' className='btn btn-primary'>Insertar usuario</button>                  
        </form>
     </div>
    );
}

export default CompCreateUser