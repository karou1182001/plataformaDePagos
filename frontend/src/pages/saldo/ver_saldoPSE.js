import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from "../pagos/credito";
import React from 'react';
import "../../css/payform.css";
import { useParams } from "react-router-dom";
const URI= "http://localhost:3001/tarjetas/";


function VerSaldoPSE() {
     /*--------------------VARIABLES------------------------- */
     const[tarjetasPSE, setPSEList]= useState([]);
     const {id} = useParams();

     /*------------------MÉTODOS-------------------------------- */
     useEffect(()=>{
         getAllTarjetasPSE(id)
     },[])
 
     //Mostrar todas las tarjetas PSE
     const  getAllTarjetasPSE= async(id)=>{
        const res= await axios.get(URI+'/'+'PSE'+'/'+id);
        setPSEList(res.data);
     } 
 
     //Eliminar una tarjeta
     const deleteTarjeta= async(id2)=>{
         await axios.delete(`${URI}${id2}`)
         
         //Llamamos al getAllUsers para ver cómo quedó la lista de usuarios
         getAllTarjetasPSE(id)
     } 
 
      /*-----------------------INTERFAZ GRÁFICA-------------------------- */
      return(
        <div className='container'>
                <h1><center>Tarjetas PSE registradas</center></h1>
            <div className='row mt-3'>
                 <div className='col'>
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
                                    <td> <b>{tarjeta.nombreBanco}</b> </td>
                                    <td> <b>{ tarjeta.monto+'$'}</b> </td>  
                                    <td> <b>{ tarjeta.tipoPersona}</b> </td>            
                                   <td>
                                   <button onClick={ ()=>deleteTarjeta(tarjeta.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                            </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
                <div>
                <Link to={"/registrartarjetaPSE/"+id} className='btn btn-primary'>Registrar tarjeta   <i class="fa-solid fa-address-card"></i></Link>
                <Link to={"/versaldo/"+id} className='btn btn-primary mx-5'>Ver tarjetas de Crédito  <i class="fa-solid fa-arrow-right"></i></Link>
                </div>
             </div>
        </div>
    )
}

export default VerSaldoPSE;






