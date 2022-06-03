import React from 'react';
import {Link} from "react-router-dom";
import { useState, } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const URI= "http://localhost:3001/tarjetas/";
function RegistrarTarjeta(){
    const [tipoTarjeta, settipoTarjeta] = useState('');
    const [codSeg, setcodSeg] = useState('');
    const [fechaVenc, setfechaVenc] = useState('');
    const navigate= useNavigate();
 
    const createTarjeta = async (e) => {
        e.preventDefault()
        await axios.post(URI, {tipoTarjeta: tipoTarjeta,monto:Math.floor(Math.random() * (10 - 1) + 1)*1000000,codSeg:codSeg,fechaVenc:fechaVenc})
        //Nos manda a la ruta principal
        navigate('/versaldo')
    } 
    return(
        <body> 
            <h1><center>Registrar tarjeta de Crédito</center></h1>
        <form onSubmit={createTarjeta}>
             <p>Tipo de tarjeta:
             <br></br><label> <input type="radio" name="tipos" value={tipoTarjeta}  onChange={ (e)=> settipoTarjeta('Visa')} required></input> Visa</label>
             <br></br><label> <input type="radio" name="tipos" value={tipoTarjeta}  onChange={ (e)=> settipoTarjeta('Mastercard')} required></input> Mastercard</label>
             <br></br><label><input type="radio" name="tipos" value={tipoTarjeta}  onChange={ (e)=> settipoTarjeta('American Express')} required></input> American Express</label>
            </p>
             {/*<p>Monto: <input type="number" name="monto" min= "0" max="100000000000" maxlength="3" required></input></p>*/}
             <p>CVV: <input type="number" name="cvv" min= "0" max="1000" maxlength="3" value={codSeg} onChange={ (e)=> setcodSeg(e.target.value)}  required></input></p>
             <p>Fecha de vencimiento: <input type="date" id="start" name="fecha" min="2022-06-30" max="2030-12-31" value={fechaVenc} onChange={ (e)=> setfechaVenc(e.target.value)} required></input></p>
           <button type="submit">Registrar</button>
            <Link to="/versaldo" className='btn btn-primary'><i>Atrás</i></Link>
        </form>
        </body>
    )
}
export default RegistrarTarjeta
