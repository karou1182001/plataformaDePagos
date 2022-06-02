import { useState, useEffect } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {Link} from "react-router-dom";

const URI= "http://localhost:3001/users/";

function CompCredito() {
    /*--------------------VARIABLES------------------------- */


    /*------------------MÉTODOS-------------------------------- */
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        <div className="container">
                <div className="input-group">
                    <h4></h4>
                    <img src="/images/tarjetasvalidas.png"  width="150" alt="images"></img>
                </div>
                
                 <div className="input-group">
                    {/*Número de tarjeta */}
                    <div className="input-box">
                        <input type="tel"
                        placeholder="Número de tarjeta (Ej: **** **** **** ****)"
                        required class="name"/>
                        <i className="fa fa-credit-card icon"></i>  
                     </div>
                </div>
                {/*Código de seguridad*/}
                <div className="input-group">
                    <div className="input-box">
                        <input type="number"
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
                        
                        <input type="number"
                        placeholder="# Cuotas"
                        required class="dob"/> 

                        {/*<input type="date"
                        placeholder="YY"
                        required class="dob"/> */}
                    
                    </div>
                    
                </div>
            
            <div className="input-group">
                <div className="input-box">
                    <button type="submit">PAY NOW</button>
                </div>
            </div>
        </div>
        
        
        
     
);
}

export default CompCredito;



