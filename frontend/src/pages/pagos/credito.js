import { useState, useEffect } from "react";
import React from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const URI= "http://localhost:3001/users/pagos/transaccion/";

function CompCredito({userName, cc, conceptoDePago, sede, franquicia}) {
    /*--------------------VARIABLES------------------------- */
    const navigate= useNavigate();
    //El valor de transacción va a ser fijo porque será el costo de matrícula
    const [valorTrans, setvalorTrans] = useState(10);
    const [numCuotas, setnumCuotas] = useState(0);
    /*Las siguientes 3 variables las cogeremos del componente pagos */
    //const [conceptoDePago, setconceptoDePago] = useState('');
    //const [sede, setsede] = useState('');
    //const [franquicia, setfranquicia] = useState('');
    const [exitosa, setexitosa] = useState(0);
    const [numTarjeta, setNumTarjeta] = useState("");
    const [codSeg, setCodSeg] = useState(0);
    const [mesVenc, setMesVenc] = useState("");
    const [yearVenc, setYearVenc] = useState("");

    /*------------------MÉTODOS-------------------------------- */
     //procedimiento crear una nueva transacción
     const createNewTransaction = async (e) => {
        e.preventDefault();
        try {

            //Para realizar el pago debe hacer 4 cosas

            //1.Verificar los datos del usuario
            //-Buscamos el id del usuario que corresponda con ese nombre y esa cédula
            const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
            var idUsuario= temp.data.id
            console.log("El id usuario es "+ idUsuario);

            //-Verificamos que la tarjeta exista y los datos sean correctos
            const fechaVenc= mesVenc+"/"+ yearVenc
            const temp1 = await axios.get(URI+"tarjeta/",{params: {numTarjeta: numTarjeta, codSeg: codSeg, fechaVenc: fechaVenc}});
            var idTarjeta= temp1.data.idTarjeta
            console.log("El id de tarjeta es" + idTarjeta);

            if(idUsuario === undefined || idTarjeta === undefined){
                if(idUsuario === undefined){
                    alert("La anterior cuenta no coincide con nuestros registros");
                }
                if(idTarjeta === undefined){
                    alert("La anteriores datos de tarjeta no son correctos");
                }
                
            }
            else{
 
               //2.Busca el monto actual de la tarjeta
                const tarjeta = await axios.get(URI+idTarjeta)
                var nuevoMonto= tarjeta.data.monto-valorTrans
                //Verificamos que el monto sea mayor o igual a cero (En caso de tarjetas crédito, el monto es como el cupo)

                if(nuevoMonto>=0){
                    //3.Descuenta monto de la cuenta del usuario a partir del id de la tajeta
                    //y verificamos que esta tarjeta esté asociada con este usuario
                    await axios.put(URI+idTarjeta, {  monto: nuevoMonto }, {params: {idTitular: idUsuario}}).catch(error =>
                        alert("El usuario y los datos de tarjeta no son asociados"));
                
                    
                    //4.Realiza transación
                    //Como todo ha sido validado hasta acá, la transferencia se considera exitosa
                    setexitosa(1);
                    await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
                    
                    //Ya después de haber hecho el pago lo mandamos a otra ruta
                    navigate('/pagos');
                    //Le damos un mensaje diciendo que el pago se completó exitosamente
                    alert("Transferencia exitosa");
                }else{
                    //4.Guarda la transación como no exitosa
                    setexitosa(0);
                    await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
                    
                    //Ya después de haber hecho el pago lo mandamos a otra ruta
                    navigate('/pagos');
                    //Le damos un mensaje diciendo que el pago se completó exitosamente
                    alert("Transferencia no exitosa. Su tarjeta no tiene cupo");

                }
            }
        } catch (error) {
             alert("Por favor ingrese los datos correctamente");
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
                        value={numTarjeta}
                        onChange={ (e)=> setNumTarjeta(parseInt(e.target.value))} 
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
                        value={codSeg}
                        onChange={ (e)=> setCodSeg(parseInt(e.target.value))} 
                        type="number"
                        placeholder="CCV (Ej: 123)"
                        required class="name"/>
                        <i className="fa-solid fa-lock icon"></i>  
                    </div>
                </div>
                 <div className="input-group">
                     
                    <div className="input-box">
                        <h5>Fecha de expiración</h5>
                        <input 
                        value={mesVenc}
                        onChange={ (e)=> setMesVenc(e.target.value)} 
                        type="number"
                        placeholder="MM"
                        required class="dob"/> 

                        <input 
                        value={yearVenc}
                        onChange={ (e)=> setYearVenc(e.target.value)} 
                        type="number"
                        placeholder="YY"
                        required class="dob"/> 
                    </div>
                    <div className="input-box">
                        <h5>Número de cuotas</h5>
                        <input 
                        value={numCuotas}
                        onChange={ (e)=> setnumCuotas(parseInt(e.target.value))} 
                        type="number"
                        placeholder="# Cuotas"
                        required class="dob"/> 
                    </div>
                    
                </div>
            
            <div className="input-group">
                <div className="input-box">
                    <button onClick={createNewTransaction}>PAY NOW</button>
                </div>
            </div>
        </div>
);
}

export default CompCredito;



