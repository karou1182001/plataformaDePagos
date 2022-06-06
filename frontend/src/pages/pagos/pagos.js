import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from './credito';
import CompDebito from './debito';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/payform.css";
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap'
// eslint-disable-next-line
const URI= "http://localhost:3001/users/";

function CompPagos() {
    /*--------------------VARIABLES------------------------- */
    const [userName, setUserName] = useState('');
    const [cc, setCc] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [conceptoDePago, setconceptoDePago] = useState('');
    const [sede, setsede] = useState('');
    const [franquicia, setfranquicia] = useState('');

    const [password,setPassword]=useState('');
    const [show, setShow] = useState(false);
    const navigate= useNavigate();


    const [isToggled, setIsToggled] = useState(false);
    const onToggle = () => setIsToggled(!isToggled);
    /*------------------MÉTODOS-------------------------------- */
    
    const handle= () => setShow(!show);
    const modalStyles={
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,-50%)'
    }
    const validarInicio= async()=>{
        try {
            if(email.length===0 || password.length===0){
                alert('Rellenar todos los campos')
            }else{
                if(!email.includes('@')){
                    alert('Email incorrecto')
                }else{
                    const res = await axios.post('http://localhost:3001/users/loginusuario', {email: email,password:password});
                    if(res.data==null){
                        alert('Usuario no se encuentra registrado')
                    }else{
                        navigate('/versaldo/'+res.data.id)
                    }
                }
            }
        } catch (error) {
            alert('Error: '+error.message);
        }
    }
     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    
    return(
        <>
        <div className="sw">
        <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
        </div>
        <div className= "wrapper">
            <form >
                <div class="payment-logo">
                    <p>p</p>
                </div>
                <h4>Cuenta</h4>
                {/*Nombre de usuario */}
                <div className="input-group">
                    <div className="input-box">
                        <input
                        value={userName}
                        onChange={ (e)=> setUserName(e.target.value)} 
                        type="text"
                        placeholder="Nombre completo*"
                        required class="name"/>
                        <i className="fa fa-user icon"></i>  
                    </div>
                </div>
                {/*Cédula*/}
                <div className="input-group">
                    <div className="input-box">
                        <input
                        value={cc}
                        onChange={ (e)=> setCc(e.target.value)} 
                        type="number"
                        placeholder="Cédula*"
                        required class="name"/>
                        <i className="fas fa-id-card icon"></i> 
                    </div>
                </div>
                {/*Email de usuario */}
                <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value)} 
                        type="email"
                        placeholder="Email"
                        class="name"/>
                        <i className="fa fa-envelope icon"></i>  
                    </div>
                </div>
                 {/*Celular*/}
                 <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={celular}
                        onChange={ (e)=> setCelular(e.target.value)} 
                        type="tel"
                        placeholder="Celular"
                        class="name"/>
                        <i className="fa-solid fa-phone icon"></i> 
                    </div>
                </div>
                {/*Concepto de pago*/}
                <div className="input-group">
                    <div className="input-box">
                        <input
                        value={conceptoDePago}
                        onChange={ (e)=> setconceptoDePago(e.target.value)} 
                        type="text"
                        placeholder="Concepto de pago"
                        class="name"/>
                        <i className="fa-solid fa-pencil icon"></i>
                    </div>
                </div>
                 {/*Sede*/}
                 <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={sede}
                        onChange={ (e)=> setsede(e.target.value)} 
                        type="text"
                        placeholder="Sede"
                        class="name"/>
                        <i className="fa fa-institution icon"></i>  
                    </div>
                </div>
                 {/*Franquicia*/}
                 <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={franquicia}
                        onChange={ (e)=> setfranquicia(e.target.value)} 
                        type="text"
                        placeholder="Franquicia"
                        class="name"/>
                        <i className="fa fa-industry icon"></i>  
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-box">
                        <h4>Detalles de pago</h4>
                        <div className= "card">
                            {/*---------------------------------------------Barra de navegación de tipo de pago----------------------------------------------------------*/}
                            <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-credito-tab" data-toggle="pill" href="#pills-credito" role="tab" aria-controls="pills-credito" aria-selected="true">
                                    <i className='fa fa-credit-card'></i>Crédito</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-debito-tab" data-toggle="pill" href="#pills-debito" role="tab" aria-controls="pills-debito" aria-selected="false">
                                    <i className="fa-solid fa-building-columns"></i>Débito</a>
                                </li>
                            </ul>
                            {/*---------------------------------------------Componentes----------------------------------------------------------*/}
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-credito" role="tabpanel" aria-labelledby="pills-credito-tab">
                                    <CompCredito userName={userName} cc={parseInt(cc)} conceptoDePago={conceptoDePago} sede={sede} franquicia={franquicia} isToggled={isToggled}/>
                                    
                                </div>
                                <div className="tab-pane fade" id="pills-debito" role="tabpanel" aria-labelledby="pills-debito-tab">
                                    <CompDebito userName={userName} cc={parseInt(cc)} celular={celular}  conceptoDePago={conceptoDePago} sede={sede} franquicia={franquicia} isToggled={isToggled}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="input-group">
                <div className="input-box">
                     <button onClick={handle} disabled={isToggled} class="btn btn-link">Consultar saldo de mis tarjetas</button>
                </div>
            </div>
        </div>
        <Modal isOpen={show} style={modalStyles}>
        <ModalHeader toggle={handle}>
        Consultar saldo de mis tarjetas
        </ModalHeader>
        <ModalBody>
            <p>Llenar el correo de la cuenta y esta contraseña para hacer la consulta</p>
         <FormGroup>
             <Label for="password">Contraseña</Label>
             <Input type="password" id="password"   value={password}  maxlength='20'
                        onChange={ (e)=> setPassword(e.target.value)} ></Input>
         </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={validarInicio}>Consultar</Button>
            <Button color="secondary" onClick={handle}>Cerrar</Button>
        </ModalFooter>
    </Modal>
    </>
);
}
export default CompPagos;



