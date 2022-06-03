import { useState, useEffect } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const URI= "http://localhost:3001/users/pagos/transaccion/";

function CompCredito({conceptoDePago, sede, franquicia}) {
    /* sede, franquicia */
    /*--------------------VARIABLES------------------------- */
    const navigate= useNavigate();
    const [valorTrans, setvalorTrans] = useState(50);
    const [numCuotas, setnumCuotas] = useState(0);
    //const [fechaTrans, setfechaTrans] = useState('a');
    //const [horaTrans, sethoraTrans] = useState('a');
    /*Las siguientes 3 variables las cogeremos del componente pagos */
    //const [conceptoDePago, setconceptoDePago] = useState('');
    //const [sede, setsede] = useState('');
    //const [franquicia, setfranquicia] = useState('');
    const [exitosa, setexitosa] = useState(0);
    const [idTarjeta, setidTarjeta] = useState(1);

    /*------------------MÉTODOS-------------------------------- */
     //procedimiento crear una nueva transacción
     const createNewTransaction = async (e) => {
        e.preventDefault();
        try {

            //Para realizar el pago debe hacer 3 cosas

            //1.Verificar los datos del usuario


            //2.Realiza transación
            await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
            
            //3.Descuenta monto de la cuenta del usuario


            
            //Ya después de haber hecho el pago lo mandamos a otra ruta
            navigate('/pagos');
            //Le damos un mensaje diciendo que el pago se completó exitosamente
            alert("Transferencia exitosa");
            
        } catch (error) {
             alert(error);
        }
        
    }   
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        //REVISAR ESTO
        <div className="container">
                <div className="input-group">
                    <h4></h4>
                    <img src="/images/tarjetasvalidas.png"  width="150" alt="images"></img>
                </div>
                
                 <div className="input-group">
                    {/*Número de tarjeta */}
                    <div className="input-box">
                        <input 
                        value={idTarjeta}
                        onChange={ (e)=> setidTarjeta(parseInt(e.target.value))} 
                        type="number"
                        placeholder="Número de tarjeta (Ej: **** **** **** ****)"
                        required class="name"/>
                        <i className="fa fa-credit-card icon"></i>  
                     </div>
                </div>
                {/*Código de seguridad*/}
                <div className="input-group">
                    <div className="input-box">
                        <input 
                        type="number"
                        placeholder="CCV (Ej: 123)"
                        required class="name"/>
                        <i className="fa-solid fa-lock icon"></i>  
                    </div>
                </div>
                 <div className="input-group">
                     
                    <div className="input-box">
                        <h5>Fecha de expiración</h5>
                        <input type="month"
                        placeholder="MM/YY"
                        required class="dob"/>
                        
                        <input 
                        value={numCuotas}
                        onChange={ (e)=> setnumCuotas(parseInt(e.target.value))} 
                        type="number"
                        placeholder="# Cuotas"
                        required class="dob"/> 

                        {/*<input type="date"
                        placeholder="YY"
                        required class="dob"/> */}
                    
                    </div>
                    
                </div>
            
            <div className="input-group">
                <div className="input-box">
                    <button onClick={createNewTransaction}>PAY NOW</button>
                    {/*<button type="submit">PAY NOW</button>*/}
                </div>
            </div>
        </div>
        
        
        
     
);
}

export default CompCredito;



