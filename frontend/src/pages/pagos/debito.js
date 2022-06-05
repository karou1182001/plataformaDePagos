import { useState, useEffect } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const URI= "http://localhost:3001/users/";

function CompDebito({userName, cc, celular, conceptoDePago, sede, franquicia}) {
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
    const [nombreBanco, setnombreBanco] = useState("");
    const [personaNormal, setpersonaNormal] = useState(0);
    const [personaJuridica, setpersonaJuridica] = useState(1);

    /*------------------MÉTODOS-------------------------------- */
     //procedimiento crear una nueva transacción
     const createNewTransaction = async (e) => {
        e.preventDefault();
        try {

            //Para realizar el pago debe hacer 3 cosas

            //1.Verificar los datos del usuario
            const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
            var idUsuario= temp.data.id
            console.log("El id usuario es "+ idUsuario);

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
                    {/*Tipo de Persona*/}
                    <h5>Tipo de persona</h5>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                            onChange={ (e)=> setpersonaNormal(parseInt(e.target.value))}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            Persona Natural
                        </label>
                    </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                            onChange={ (e)=> setpersonaJuridica(parseInt(e.target.value))}
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                            Persona Juridica
                        </label>
                    </div>
                <div className="input-group">
                    {/*Nombre del banco*/}
                    <h5>Nombre del banco</h5>
                    <div className="input-box">
                            <input 
                            onChange={ (e)=> setnombreBanco(parseInt(e.target.value))} 
                            type="string"
                            placeholder="Escriba su banco (EJ: Bancolombia)"
                            required class="name"/>
                            <i className="fa fa-credit-card icon"></i>  
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

export default CompDebito;