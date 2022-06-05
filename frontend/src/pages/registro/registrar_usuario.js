import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import React from 'react';
import "../../css/payform.css";


// eslint-disable-next-line
const URI= "http://localhost:3001/users/registrarusuario";

function RegistrarUsuario() {
    /*--------------------VARIABLES------------------------- */
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [userName, setUserName] = useState('');
    const [cc, setCc] = useState();
    const [celular, setCelular] = useState('');
    /*------------------MÉTODOS-------------------------------- */
    
    const registerUser= async(e)=>{
        e.preventDefault();
        try {
            if(email.length===0 || password.length===0 || userName.length===0 || (cc===undefined || cc.length===0) || celular.length===0){
                alert('Rellenar todos los campos')
            }else{
                if(!email.includes('@')){
                    alert('Email incorrecto')
                }else{
                    if(cc.length>10){
                        alert('Cedula incorrecta')
                    }else{
                        const res = await axios.post(URI, {email: email,password:password,userName:userName,cc:cc, celular:celular});
                        if(res.data!=null){
                            alert('El email ya se encuentra registrado')
                        }
                    }
                }
            }
        } catch (error) {
            alert('Error: '+error.message);
        }
        //Nos manda a la ruta principal
       // navigate('/versaldo')
    }
     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    
    return(
        <div className= "wrapper">
             <h1>
                <center>
                Registro
                </center>
            </h1>
            <form class='mt-3'>
            <div className="input-group">
                    <div className="input-box">
                        <input 
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value)} 
                        type="email"
                        placeholder="Email"
                        maxlength="45"
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
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
                        maxlength='20'
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
                        maxlength='45'
                        required class="name"/>
                        <i className="fa fa-user icon"></i>  
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-box">
                        <input
                        value={cc}
                        onChange={ (e)=> setCc(e.target.value)} 
                        maxLength="10"
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
                        maxlength='20'
                        required class="name"/>
                        <i className="fa-solid fa-phone icon"></i> 
                    </div>
                </div>
                <button type="submit" onClick={registerUser}   className='btn btn-primary mt-3'>Registrar</button>
            </form>
        </div>
);
}

export default RegistrarUsuario;