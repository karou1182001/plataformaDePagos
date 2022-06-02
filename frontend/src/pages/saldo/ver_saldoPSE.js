import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from "../pagos/credito";
import React from 'react';
import "../../css/payform.css";

const URI= "http://localhost:3001/tarjetas/";


function VerSaldoPSE() {
     /*--------------------VARIABLES------------------------- */
     const[tarjetasPSE, setPSEList]= useState([]);


     /*------------------MÉTODOS-------------------------------- */
     useEffect(()=>{
         getAllTarjetasPSE()
     },[])
 
     //Mostrar todas las tarjetas PSE
     const  getAllTarjetasPSE= async()=>{
        const res= await axios.get(URI+'/'+'PSE');
        setPSEList(res.data);
     } 
 
     //Eliminar un usuario
     const deleteTarjeta= async(id)=>{
         await axios.delete(`${URI}${id}`)
         
         //Llamamos al getAllUsers para ver cómo quedó la lista de usuarios
         getAllTarjetasPSE()
     } 
 
      /*-----------------------INTERFAZ GRÁFICA-------------------------- */
      return(
        <div className='container'>
            <div className='row'>
                 <div className='col'>
                 <h1><center>Tarjetas PSE registradas</center></h1>
                     <table className='table'>
                         <thead className='table-primary'>
                         <tr align="center">
                                <th>Banco</th>
                                <th>Saldo</th>
                                {<th>Persona</th>}
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tarjetasPSE.map ( (tarjeta) => (
                                <tr key={ tarjeta.id} align="center">
                                    <td> {tarjeta.nombreBanco} </td>
                                    <td> { tarjeta.monto} </td>  
                                    <td> { tarjeta.tipoPersona} </td>            
                                   <td>
                                   <button onClick={ ()=>deleteTarjeta(tarjeta.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                            </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
                <div>
                <Link to="/create" className='btn btn-primary'><i>Registrar tarjeta</i></Link>
                <Link to="/versaldo" className='btn btn-primary'><i>Ver tarjetas Crédito</i></Link>
                </div>
             </div>
        </div>
    )
}

export default VerSaldoPSE;






