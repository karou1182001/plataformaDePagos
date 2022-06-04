import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import React from 'react';
import "../../css/payform.css";

// eslint-disable-next-line
const URI= "http://localhost:3001/users/";

function RegistrarUsuario() {
    /*--------------------VARIABLES------------------------- */
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [userName, setUserName] = useState('');
    const [cc, setCc] = useState(0);
    const [celular, setCelular] = useState('');
    /*------------------MÉTODOS-------------------------------- */
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    
    return(

        <div className= "wrapper">
             <h1>
                <center>
                Registro
                </center>
            </h1>
            <form method="POST" class='mt-3'>
            <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value)} 
                        type="email"
                        placeholder="Email"
                        required class="name"/>
                        <i className="fa fa-envelope icon"></i>  
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-box">
                        <input
                        value={password}
                        onChange={ (e)=> setpassword(e.target.value)} 
                        type="password"
                        placeholder="Contraseña*"
                        maxlength='15'
                        required class="name"/>
                      <i class="fa-solid fa-lock icon"></i>
                    </div>
                </div>
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
                  <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={celular}
                        onChange={ (e)=> setCelular(e.target.value)} 
                        type="tel"
                        placeholder="Celular"
                        maxlength='15'
                        required class="name"/>
                        <i className="fa-solid fa-phone icon"></i> 
                    </div>
                </div>
                <button type="submit" className='btn btn-primary mt-3'>Registrar</button>
            </form>
        </div>

       
);
}

export default RegistrarUsuario;