import { useState, useEffect } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap'

const URI= "http://localhost:3001/users/pagos/transaccion/";

function CompDebito({userName, cc, celular, conceptoDePago, sede, franquicia, isToggled}) {
    /* sede, franquicia */
    /*--------------------VARIABLES------------------------- */
    const navigate= useNavigate();
    const [valorTrans, setvalorTrans] = useState(50);
    const [numCuotas, setnumCuotas] = useState(1);
    //const [franquicia, setfranquicia] = useState('');
    const [exitosa, setexitosa] = useState(0);
    const [idTarjeta, setidTarjeta] = useState(1);
    // 0 = unchecked - 1 = natural - 2 = juridica
    const [tipoDePersona, setTipoDePersona] = useState(null);
    // 0 = unchecked - 1 = East Bank - 2 = Western Bank
    const [tipoBanco, setTipoBanco] = useState(null);
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
            //Para realizar el pago debe hacer 3 cosas

            //1.Verificar los datos del usuario
            const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
            var idUsuario= temp.data.id
            console.log("El id usuario es "+ idUsuario);

            //Verificamos datos de la tarjeta
            const temp1 = await axios.get("http://localhost:3001/tarjetas/PSE2/"+idUsuario);
            var idTarjeta= temp1.data
            console.log("info pse:", idTarjeta)
            console.log("length:", idTarjeta.length)

            const res2= await axios.get('http://localhost:3001/bancosInactivos');

            var banconame="";
            if (tipoBanco===0) {
            }else{
              if (tipoBanco===1) {
                banconame = "East Bank"
              }else{
                banconame = "Western Bank"
              }
            }

            var persontype="";
            if (tipoDePersona===0) {
            }else{
              if (tipoDePersona===1) {
                persontype = "Natural"
              }else{
                persontype = "Juridica"
              }
            }
            var sw = 0;
            for(var i= 0; i<idTarjeta.length;i++){
              if(res2.data.includes(banconame)){
                alert('El banco seleccionado no tiene el servicio disponible')
                break;
              }else{
                if (idTarjeta[i].nombreBanco === banconame && idTarjeta[i].tipoPersona === persontype) {
                  sw=0;
                  var nuevoMonto = idTarjeta[i].monto - valorTrans;
                  if(nuevoMonto>=0)
                      {
                          //3.Descuenta monto de la cuenta del usuario a partir del id de la tajeta
                          //que está asociada con este usuario
                          await axios.put(URI+idTarjeta[i].id,{monto: nuevoMonto},{params: {idTitular: idUsuario}})
                          
                          //4.Realiza transación
                          //Como todo ha sido validado hasta acá, la transferencia se considera exitosa
                          setexitosa(1);
                          setidTarjeta(idTarjeta[i].id);
                          await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
                          
                          //Ya después de haber hecho el pago lo mandamos a otra ruta
                          navigate('/pagos');
                          //Le damos un mensaje diciendo que el pago se completó exitosamente
                          alert("Transferencia exitosa");
                      }
                      else{
                          //4.Guarda la transación como no exitosa
                          setexitosa(0);
                          await axios.post(URI, {valorTrans: valorTrans, numCuotas: numCuotas, conceptoDePago: conceptoDePago , sede: sede, franquicia: franquicia, exitosa: exitosa, idTarjeta: idTarjeta})
                          
                          //Le damos un mensaje diciendo que el pago se completó exitosamente
                          alert("Transferencia no exitosa. No tiene una tarjeta con esa informacion");
                          //Ya después de haber hecho el pago lo mandamos a otra ruta
                          navigate('/pagos');
  
                      }
                  break;
                }else{
                  //no tienen tarjeta o informacion mal administrada
                  sw=1;
                }
              }
            
            }

            if (sw===1) {
              setTexto("Datosde tarjeta mal ingresados o incompletos. Rellene correctamente los campos")
              handle();
            }

    
            
        } catch (error) {
             alert(error);
        }
    }
    //procedimiento crear una nueva transacción
    const consultarSaldoDedito = async (e) => {
      e.preventDefault();
      try {
          setTextoEncabezado("Consultar saldo de esta tarjeta")
          //Para realizar el pago debe hacer 3 cosas

          //1.Verificar los datos del usuario
          const temp = await axios.get(URI,{params: {userName: userName, cc: cc}});
          var idUsuario= temp.data.id
          console.log("El id usuario es "+ idUsuario);

          //Verificamos datos de la tarjeta
          const temp1 = await axios.get("http://localhost:3001/tarjetas/PSE2/"+idUsuario);
          var idTarjeta= temp1.data
          console.log("info pse:", idTarjeta)
          console.log("length:", idTarjeta.length)

          var banconame="";
          if (tipoBanco===0) {
          }else{
            if (tipoBanco===1) {
              banconame = "East Bank"
            }else{
              banconame = "Western Bank"
            }
          }

          var persontype="";
          if (tipoDePersona===0) {
          }else{
            if (tipoDePersona===1) {
              persontype = "Natural"
            }else{
              persontype = "Juridica"
            }
          }
          var sw = 0;
          for(var i= 0; i<idTarjeta.length;i++){
            if (idTarjeta[i].nombreBanco === banconame && idTarjeta[i].tipoPersona === persontype) {
              sw=0;
              setMonto(idTarjeta[i].monto);
              setTexto("El monto que usted tiene actualmente es de:");
              handle();

              break;
            }else{
              //no tienen tarjeta o informacion mal administrada
              sw=1;
            }
          }

          if (sw===1) {
            setTexto("Datosde tarjeta mal ingresados o incompletos. Rellene correctamente los campos")
            handle();
          }

  
          
      } catch (error) {
           alert(error);
      }
  }
     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        //REVISAR ESTO
        <>
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
                  <div className="input-group">
                      <div className="input-box">
                          <button onClick={consultarSaldoDedito} disabled={isToggled}class="btn btn-link">Consultar saldo de esta tarjeta</button>
                      </div>
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

export default CompDebito;