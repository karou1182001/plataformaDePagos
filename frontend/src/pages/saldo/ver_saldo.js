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
     const deleteTarjeta= async(idTarjeta)=>{
         await axios.delete(`${URI}${idTarjeta}`)

         //Llamamos al getAllUsers para ver cómo quedó la lista de usuarios
         getAllTarjetas();
     } 
 
      /*-----------------------INTERFAZ GRÁFICA-------------------------- */
      return(
        <div className='container'>
            <div className='row'>
                 <div className='col'>
                 <h1><center>Tarjetas Crédito registradas</center></h1>
                     <table className='table'>
                         <thead className='table-primary'>
                         <tr align="center">
                                <th>Vencimiento</th>
                                <th>Saldo</th>
                                <th>Tipo</th>
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tarjetas.map ( (tarjeta) => (
                                <tr key={ tarjeta.id} align="center">
                                    <td> {tarjeta.fechaVenc} </td>
                                    <td> { tarjeta.monto} </td>  
                                    <td> { tarjeta.tipo} </td>            
                                   <td>
                                   <button onClick={ ()=>deleteTarjeta(tarjeta.idTarjeta) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                            </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
                <div>
                <Link to="/registrartarjeta" className='btn btn-primary'><i>Registrar tarjeta</i></Link>
                <Link to="/versaldo/versaldoPSE" className='btn btn-primary'><i>Ver tarjetas PSE</i></Link>
                </div>
             </div>
        </div>
    )
}

export default VerSaldo;






