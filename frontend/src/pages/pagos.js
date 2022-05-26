import '../css/style.css';
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const URI= "http://localhost:3001/users/";

function CompPagos() {
    /*--------------------VARIABLES------------------------- */


    /*------------------MÉTODOS-------------------------------- */
    

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
     /* <div className= "container pt-5" >
            <div className= "card">
                <ul className='nav nav-pills mb-3' role="tablist">
                    <li  className="nav-item"><a href='#nav-tab-creditcard' className='nav-link active' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Credit card</a></li>
                    <li className="nav-item"><a href='#nav-tab-debitbank' className='nav-link' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Debit card</a></li>
                    <li className="nav-item"><a href='#nav-tab-saldo' className='nav-link' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Saldo</a></li>
                </ul>
            </div>
        </div> */
    return(

       
<div class="container">
<div className= "container pt-5" >
            <div className= "card">
                <ul className='nav nav-pills mb-3' role="tablist">
                    <li  className="nav-item"><a href='#nav-tab-creditcard' className='nav-link active' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Credit card</a></li>
                    <li className="nav-item"><a href='#nav-tab-debitbank' className='nav-link' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Debit card</a></li>
                    <li className="nav-item"><a href='#nav-tab-saldo' className='nav-link' data-toggle="pill" role="tab"><i className='fa fa-credit-card'></i>Saldo</a></li>
                </ul>
            </div>
        </div> 

<form action="">

    <div class="row">

        <div class="col">

            <h3 class="title">billing address</h3>

            <div class="inputBox">
                <span>full name :</span>
                <input type="text" placeholder="john deo"/>
            </div>
            <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com"/>
            </div>
            <div class="inputBox">
                <span>address :</span>
                <input type="text" placeholder="room - street - locality"/>
            </div>
            <div class="inputBox">
                <span>city :</span>
                <input type="text" placeholder="mumbai"/>
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>state :</span>
                    <input type="text" placeholder="india"/>
                </div>
                <div class="inputBox">
                    <span>zip code :</span>
                    <input type="text" placeholder="123 456"/>
                </div>
            </div>

        </div>

        <div class="col">

            <h3 class="title">payment</h3>

            <div class="inputBox">
                <span>cards accepted :</span>
            </div>
            <div class="inputBox">
                <span>name on card :</span>
                <input type="text" placeholder="mr. john deo"/>
            </div>
            <div class="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444"/>
            </div>
            <div class="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january"/>
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022"/>
                </div>
                <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234"/>
                </div>
            </div>

        </div>

    </div>

    <input type="submit" value="proceed to checkout" class="submit-btn"/>

</form>

</div>    
);
}

export default CompPagos;
