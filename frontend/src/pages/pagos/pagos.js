import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CompCredito from './credito';
import React from 'react';
import "../../css/payform.css";

// eslint-disable-next-line
const URI= "http://localhost:3001/users/";

function CompPagos() {
    /*--------------------VARIABLES------------------------- */


    /*------------------MÉTODOS-------------------------------- */
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    
    return(
        <div className= "wrapper">
            <h2>Payment form</h2>
            <form method="POST">
                <h4>Account</h4>
                <div className="input-group">
                    {/*Nombre de usuario */}
                    <div className="input-box">
                        <input type="text"
                        placeholder="Full name"
                        required class="name"/>
                        <i className="fa fa-user icon"></i>  
                    </div>
                    {/*Email de usuario */}
                    <div className="input-box">
                        <input type="text"
                        placeholder="Email"
                        required class="name"/>
                        <i className="fa fa-envelope icon"></i>  
                    </div>
                </div>
                <div className="input-group">
                    {/*Día de cumpleaños */}
                    <div className="input-box">
                        <h4>Date of birth</h4>
                        <input type="text"  placeholder="DD" class="dob"/>
                        <input type="text"  placeholder="MM" class="dob"/>
                        <input type="text"  placeholder="YYYY" class="dob"/>
                    </div>
                </div>
                <div className="input-group">
                    {/*Nombre de usuario */}
                    <div className="input-box">
                        <h4>Payment Details</h4>
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
                                    <CompCredito></CompCredito></div>
                                <div className="tab-pane fade" id="pills-debito" role="tabpanel" aria-labelledby="pills-debito-tab">
                                    Débito
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



