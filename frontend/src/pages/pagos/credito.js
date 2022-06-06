import { useState} from "react";
import React from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap'

const URI= "http://localhost:3001/users/pagos/transaccion/";
const URI2= "http://localhost:3002/";
function CompCredito({userName, cc, conceptoDePago, sede, franquicia, isToggled}) {
    /*--------------------VARIABLES------------------------- */
    const navigate= useNavigate();
    //El valor de transacción va a ser fijo porque será el costo de matrícula
    const [valorTrans, setvalorTrans] = useState(50);
    const [numCuotas, setnumCuotas] = useState(1);
    /*Las siguientes 3 variables las cogeremos del componente pagos */
    //const [conceptoDePago, setconceptoDePago] = useState('');
    //const [sede, setsede] = useState('');
    //const [franquicia, setfranquicia] = useState('');
    const [exitosa, setexitosa] = useState(0);
    const [numTarjeta, setNumTarjeta] = useState("");
    const [codSeg, setCodSeg] = useState("");
    const [mesVenc, setMesVenc] = useState("");
    const [yearVenc, setYearVenc] = useState("");
    const [show, setShow] = useState(false);
    const[monto, setMonto]=useState("");
    const[textoEncabezado, setTextoEncabezado]=useState("");
    const[texto, setTexto]=useState("");

    /*------------------MÉTODOS-------------------------------- */
    //Métodos para mostrar la pantallita bonita
    const handle= () => setShow(!show);
    const modalStyles={
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)'
    }

     //procedimiento crear una nueva transacción
     const createNewTransaction = async (e) => {
        e.preventDefault();
        try {
            setTextoEncabezado("Realizar transacción")
            //Para realizar el pago debe hacer 4 cosas

            //1.Verificar los datos del usuario y datos de tarjeta

            //-Buscamos el id del usuario que corresponda con ese nombre y esa cédula
            const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
            var idUsuario= temp.data.id
            console.log("El id usuario es "+ idUsuario);

            //-Verificamos que la tarjeta exista y los datos sean correctos
            const fechaVenc= mesVenc+"/"+ yearVenc
            const temp1 = await axios.get(URI+"tarjeta/",{params: {numTarjeta: numTarjeta, codSeg: parseInt(codSeg), fechaVenc: fechaVenc}});
            var idTarjeta= temp1.data.idTarjeta
            console.log("El id de tarjeta es" + idTarjeta);

            if(idUsuario === undefined || idTarjeta === undefined){

                if(idUsuario === undefined && idTarjeta === undefined)
                {
                    //alert("Datos mal ingresados o incompletos. Rellene correctamente los campos")
                    setTexto("Datos mal ingresados o incompletos. Rellene correctamente los campos")
                    handle();
                }else{
                    if(idUsuario === undefined){
                        //alert("La anterior cuenta no coincide con nuestros registros");
                        setTexto("La anterior cuenta no coincide con nuestros registros")
                        handle();
                    }
                    if(idTarjeta === undefined){
                        //alert("La anteriores datos de tarjeta no son correctos");
                        setTexto("La anteriores datos de tarjeta no son correctos")
                        handle();
                    }
                }
               
                
            }
            else{
 
               //2.Busca el monto actual de la tarjeta y verificamos que esta tarjeta esté asociada con este usuario
                const tarjeta = await axios.get(URI+idTarjeta, {params: {idTitular: idUsuario}})

                if (tarjeta.data.monto === undefined) 
                {
                    //alert("El usuario y los datos de tarjeta no son asociados");
                    setTexto("El usuario y los datos de tarjeta no son asociados")
                    handle();
                } 
                else {
                    //Calculamos el nuevo monto que tendrá en su tarjeta
                    var nuevoMonto= tarjeta.data.monto-valorTrans
                    //Verificamos que el monto sea mayor o igual a cero (En caso de tarjetas crédito, el monto es como el cupo)
                    if(nuevoMonto>=0)
                    {
                        //3.Descuenta monto de la cuenta del usuario a partir del id de la tajeta
                        //que está asociada con este usuario
                        await axios.put(URI+idTarjeta, {  monto: nuevoMonto }, {params: {idTitular: idUsuario}})
                        
                        
                        //4.Realiza transación
                        //Como todo ha sido validado hasta acá, la transferencia se considera exitosa
                        setexitosa(1);
                        await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: 1, idTarjeta: idTarjeta})
                        await axios.post(URI2, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: 1, idTarjeta: idTarjeta})
                        //Ya después de haber hecho el pago lo mandamos a otra ruta
                        navigate('/pagos');
                        //Le damos un mensaje diciendo que el pago se completó exitosamente
                        alert("Transferencia exitosa");
                    }
                    else{
                        //4.Guarda la transación como no exitosa
                        setexitosa(0);
                        await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: 0, idTarjeta: idTarjeta})
                        await axios.post(URI2, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: 0, idTarjeta: idTarjeta})
                        //Le damos un mensaje diciendo que el pago se completó exitosamente
                        alert("Transferencia no exitosa. Su tarjeta no tiene cupo");
                        setTexto("Transferencia no exitosa. Su tarjeta no tiene cupo")
                        handle();
                        //Ya después de haber hecho el pago lo mandamos a otra ruta
                        navigate('/pagos');

                    }
                    
                }

                
            }
        } catch (error) {
             alert("Por favor ingrese los datos correctamente");
        }
        
    }   

    
    //Procedimiento para consultar saldo solo de esta tarjeta
    const consultarSaldoCredito = async (e) => {
        e.preventDefault();
        try {


            setTextoEncabezado("Consultar saldo de esta tarjeta")
            //Para consultar el saldo debe hacer 2 cosas

            //1.Verificar los datos del usuario y datos de tarjeta

            //-Buscamos el id del usuario que corresponda con ese nombre y esa cédula
            const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
            var idUsuario= temp.data.id
            console.log("El id usuario es "+ idUsuario);

            //-Verificamos que la tarjeta exista y los datos sean correctos
            const fechaVenc= mesVenc+"/"+ yearVenc
            const temp1 = await axios.get(URI+"tarjeta/",{params: {numTarjeta: numTarjeta, codSeg: parseInt(codSeg), fechaVenc: fechaVenc}});
            var idTarjeta= temp1.data.idTarjeta
            console.log("El id de tarjeta es" + idTarjeta);

            if(idUsuario === undefined || idTarjeta === undefined){

                if(idUsuario === undefined && idTarjeta === undefined)
                {
                    //alert("Datos mal ingresados o incompletos. Rellene correctamente los campos")
                    setTexto("Datos mal ingresados o incompletos. Rellene correctamente los campos")
                    handle();
                }else{
                    if(idUsuario === undefined){
                        
                        //alert("La anterior cuenta no coincide con nuestros registros");
                        setTexto("La anterior cuenta no coincide con nuestros registros")
                        handle();
                    }
                    if(idTarjeta === undefined){
                        
                        //alert("La anteriores datos de tarjeta no son correctos");
                        setTexto("La anteriores datos de tarjeta no son correctos")
                        handle();
                    }
                }
               
                
            }
            else{
 
               //2.Busca el monto actual de la tarjeta y verificamos que esta tarjeta esté asociada con este usuario
                const tarjeta = await axios.get(URI+idTarjeta, {params: {idTitular: idUsuario}})

                if (tarjeta.data.monto === undefined) 
                {
                    //alert("El usuario y los datos de tarjeta no son asociados");
                    setTexto("El usuario y los datos de tarjeta no son asociados")
                    handle();
                } 
                else {
                    //Mostramos el monto actual de su tarjeta
                    //alert(tarjeta.data.monto);
                    setMonto(tarjeta.data.monto);
                    setTexto("El cupo que usted tiene actualmente es de:");
                    handle();
                    
                }

                
            }
        } catch (error) {
             alert("Por favor ingrese los datos correctamente");
        }
        
    }  

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        //REVISAR ESTO
        <>
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
                        onChange={ (e)=> setCodSeg(e.target.value)} 
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
                    {/*Como el type es submit, va a llamar al método que tenga el form (Ubicado en el comp. pagos) en el onSubmit */}
                    <button type= "submit" onClick={createNewTransaction}>PAY NOW</button>
                </div>
            </div>
            <div className="input-group">
                <div className="input-box">
                     <button onClick={consultarSaldoCredito} disabled={isToggled}class="btn btn-link">Consultar saldo de esta tarjeta</button>
                </div>
            </div>
        </div>
        {/*Pantallita que solo se despliega cuando el valor del handle es true */}
        <Modal isOpen={show} style={modalStyles}>
        <ModalHeader toggle={handle}>
        {textoEncabezado}
        </ModalHeader>
        <ModalBody>
            <p>{texto}</p>
         <FormGroup>
             <Label>{monto}</Label>
         </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={handle}>Cerrar</Button>
        </ModalFooter>
    </Modal>
    </>
);
}

export default CompCredito;



