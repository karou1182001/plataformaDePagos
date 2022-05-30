import '../../App.css';
import { useState, useEffect } from "react";
import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

const URI= "http://localhost:3001/users/";

function CompShowUsers() {
    /*--------------------VARIABLES------------------------- */
    const[users, setUserNameList]= useState([]);


    /*------------------MÉTODOS-------------------------------- */
    useEffect(()=>{
        getAllUsers()
    },[])

    //Mostrar todos los users
    const getAllUsers= async()=>{
       const res= await axios.get(URI);
       setUserNameList(res.data);
    } 

    //Eliminar un usuario
    const deleteUser= async(id)=>{
        await axios.delete(`${URI}${id}`)
        
        //Llamamos al getAllUsers para ver cómo quedó la lista de usuarios
        getAllUsers();
    } 

     /*-----------------------INTERFAZ GRÁFICA-------------------------- */
    return(
        <div className='container'>
            <div className='row'>
                 <div className='col'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                     <table className='table'>
                         <thead className='table-primary'>
                            <tr>
                                <th>UserId</th>
                                <th>UserName</th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.map ( (user) => (
                                <tr key={ user.id}>
                                    <td> { user.userName} </td>
                                    <td>
                                        <Link to={`/edit/${user.id}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                        <button onClick={ ()=>deleteUser(user.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    )
}

export default CompShowUsers;
