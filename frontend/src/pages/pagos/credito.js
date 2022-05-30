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
                {/*Número de tarjeta */}
                <div className="input-box">
                    <input type="tel"
                    placeholder="Card Number"
                    required class="name"/>
                    <i className="fa fa-credit-card icon"></i>  
                </div>
                <div className="input-box">
                    <input type="tel"
                    placeholder="CCV"
                    required class="name"/>
                    <i className="fa fa-user icon"></i>  
                </div>
                <div className="input-box">
                    <select>
                        <option>01 Jun</option>
                        <option>02 Jun</option>
                        <option>03 Jun</option>
                    </select>
                    <select>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                    </select>
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



