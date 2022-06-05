import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from "../pagos/credito";
import React from 'react';
import "../../css/payform.css";

const URI= "http://localhost:3001/tarjetas/";


function VerSaldo() {
     /*--------------------VARIABLES------------------------- */
     const[tarjetas, setMontoList]= useState([]);


     /*------------------MÉTODOS-------------------------------- */
     useEffect(()=>{
         getAllTarjetas()
     },[])
 
     //Mostrar todos las tarjetas de credito
     const getAllTarjetas= async()=>{
        const res= await axios.get(URI);
        setMontoList(res.data);
     } 
 
     //Eliminar una tarjeta
     const deleteTarjeta= async(id)=>{
         await axios.delete(`${URI}${id}`)

         //Llamamos al getAllUsers para ver cómo quedó la lista de usuarios
         getAllTarjetas();
     } 
 
      /*-----------------------INTERFAZ GRÁFICA-------------------------- */
      return(
        <div className='container'>
              <h1><center>Tarjetas Crédito registradas</center></h1>
            <div className='row mt-3'>
                 <div className='col'>
                     <table className='table'>
                         <thead className='table-primary'>
                         <tr align="center">
                                <th>N. tarjeta</th>
                                <th>Vencimiento</th>
                                <th>Saldo</th>
                                <th>Tipo</th>
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tarjetas.map ( (tarjeta) => (
                                <tr key={ tarjeta.id} align="center">
                                    <td> {tarjeta.numTarjeta} </td>
                                    <td> {tarjeta.fechaVenc} </td>
                                    <td> { tarjeta.monto+'$'}</td>  
                                    <td> { tarjeta.tipo} </td>            
                                   <td>
                                   <button onClick={ ()=>deleteTarjeta(tarjeta.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                            </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
                <div>
                <Link to="/pagos" className='btn btn-primary mr-5'><i class="fa-solid fa-arrow-left"></i>   Atrás</Link>
                <Link to="/registrartarjeta" className='btn btn-primary'>Registrar tarjeta   <i class="fa-solid fa-address-card"></i></Link>
                <Link to="/versaldo/versaldoPSE" className='btn btn-primary mx-5'>Ver tarjetas PSE  <i class="fa-solid fa-arrow-right"></i></Link>
                </div>
             </div>
        </div>
    )
}

export default VerSaldo;





