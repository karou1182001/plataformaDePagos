import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from './credito';
import CompDebito from './debito';
import React from 'react';
import "../../css/payform.css";

// eslint-disable-next-line
const URI= "http://localhost:3001/users/";

function CompPagos() {
    /*--------------------VARIABLES------------------------- */
    const [conceptoDePago, setconceptoDePago] = useState('');
    const [sede, setsede] = useState('');
    const [franquicia, setfranquicia] = useState('');


    /*------------------MÉTODOS-------------------------------- */
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    
    return(
        <div className= "wrapper">
           
            
            <form method="POST">
                <div class="payment-logo">
                    <p>p</p>
                </div>
                
                <h4>Cuenta</h4>
                {/*Nombre de usuario */}
                <div className="input-group">
                    <div className="input-box">
                        <input type="text"
                        placeholder="Nombre completo*"
                        required class="name"/>
                        <i className="fa fa-user icon"></i>  
                    </div>
                </div>
                {/*Cédula*/}
                <div className="input-group">
                    <div className="input-box">
                        <input type="number"
                        placeholder="Cédula*"
                        required class="name"/>
                        <i className="fas fa-id-card icon"></i> 
                    </div>
                </div>
                {/*Email de usuario */}
                <div className="input-group">
                    <div className="input-box">
                        <input type="email"
                        placeholder="Email"
                        required class="name"/>
                        <i className="fa fa-envelope icon"></i>  
                    </div>
                </div>
                 {/*Celular*/}
                 <div className="input-group">
                    <div className="input-box">
                        <input type="tel"
                        placeholder="Celular"
                        required class="name"/>
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
                        required class="name"/>
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
                        required class="name"/>
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
                        required class="name"/>
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
                                    <CompCredito conceptoDePago={conceptoDePago} sede={sede} franquicia={franquicia}/>
                                </div>
                                <div className="tab-pane fade" id="pills-debito" role="tabpanel" aria-labelledby="pills-debito-tab">
                                    <CompDebito></CompDebito>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

       
);
}

export default CompPagos;



