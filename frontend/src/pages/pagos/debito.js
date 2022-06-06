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
    // 0 = unchecked - 1 = natural - 2 = juridica
    const [tipoDePersona, setTipoDePersona] = useState(null);
    // 0 = unchecked - 1 = East Bank - 2 = Western Bank
    const [tipoBanco, setTipoBanco] = useState(null);

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
            //Verificamos datos de la tarjeta 


            const temp1 = await axios.get("localhost:3001/tarjetas/PSE/1");
            var idTarjeta= temp1.data.idTarjeta
            console.log("El id de tarjeta es" + idTarjeta);

            if(idUsuario === undefined || idTarjeta === undefined){

                if(idUsuario === undefined && idTarjeta === undefined)
                {
                    alert("Datos mal ingresados o incompletos. Rellene correctamente los campos")
                }else{
                    if(idUsuario === undefined){
                        alert("La anterior cuenta no coincide con nuestros registros");
                    }
                    if(idTarjeta === undefined){
                        alert("La anteriores datos de tarjeta no son correctos");
                    }
                }
            }

            //2.Realiza transación
            await axios.post(URI, {valorTrans: valorTrans, numCuotas: 1, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
            
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
                  <div>
                    {/*Tipo de Persona*/}
                    <h5>Tipo de persona</h5>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={tipoDePersona === 1}
                        id="persona-natural-checkbox"
                        onChange={()=> setTipoDePersona(1)}
                      />
                      <label class="form-check-label" for="persona-natural-checkbox">
                        Persona Natural
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={tipoDePersona === 2}
                        id="persona-juridica-checkbox"
                        onChange={()=> setTipoDePersona(2)}
                      />
                      <label class="form-check-label" for="persona-juridica-checkbox">
                        Persona Juridica
                      </label>
                    </div>
                    {/*Tipo de Banco*/}
                    <h5>Banco</h5>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={tipoBanco === 1}
                        id="east-bank-checkbox"
                        onChange={()=> setTipoBanco(1)}
                      />
                      <label class="form-check-label" for="east-bank-checkbox">
                        East Bank
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={tipoBanco === 2}
                        id="western-bank-checkbox"
                        onChange={()=> setTipoBanco(2)}
                      />
                      <label class="form-check-label" for="western-bank-checkbox">
                        Western Bank
                      </label>
                    </div>
                  </div>

                  <div className="input-group">
                      <div className="input-box">
                        <button onClick={createNewTransaction}>PAY NOW</button>
                        {/*<button type="submit">PAY NOW</button>*/}
                      </div>
                  </div>
          </div>
        </div>
);

}

export default CompDebito;