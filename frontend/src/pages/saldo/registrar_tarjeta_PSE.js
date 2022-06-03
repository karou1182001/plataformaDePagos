import React from 'react';
import {Link} from "react-router-dom";
import { useState, } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const URI= "http://localhost:3001/tarjetas/";
function RegistrarTarjetaPSE(){
    const [nombre, setnombre] = useState('');
    const [tipoPersona, settipoPersona] = useState('');
    const navigate= useNavigate();
 
    const createTarjetaPSE = async (e) => {
        e.preventDefault()
        await axios.post(URI+'/'+'PSE', {tipoPersona:tipoPersona,monto:Math.floor(Math.random() * (10 - 1) + 1)*1000000,nombre:nombre})
        //Nos manda a la ruta principal
        navigate('/versaldo/versaldoPSE')
    } 
    return(
        <body> 
            <h1><center>Registrar tarjeta PSE</center></h1>
        <form onSubmit={createTarjetaPSE}>
             <p>Nombre del banco:
             <br></br><label> <input type="radio" name="bancos" value={nombre}  onChange={ (e)=> setnombre('Western Bank')} required></input> Western Bank</label>
             <br></br><label> <input type="radio" name="bancos" value={nombre}  onChange={ (e)=> setnombre('East Bank')} required></input> East Bank</label>
            </p>
            <p>Tipo de persona:
             <br></br><label> <input type="radio" name="personas" value={tipoPersona}  onChange={ (e)=> settipoPersona('Natural')} required></input>Natural</label>
             <br></br><label> <input type="radio" name="personas" value={tipoPersona}  onChange={ (e)=> settipoPersona('Juridica')} required></input>Juridica</label>
            </p>   
           <button type="submit">Registrar</button>
            <Link to="/versaldo/versaldoPSE" className='btn btn-primary'><i>Atrás</i></Link>
        </form>
        </body>
    )
}
export default RegistrarTarjetaPSE