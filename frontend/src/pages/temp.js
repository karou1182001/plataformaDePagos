import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  /*--------------------VARIABLES------------------------- */
  const[userName, setUserName]= useState('');
  const[review, setReview]= useState('');
  const[userNamesList, setUserNameList]= useState([]);
  
  const[newUserName, setnewUserName]=useState('');


  /*------------------MÉTODOS-------------------------------- */

  //Méodo para obtener del backend la lista de usuarios 
  useEffect(()=>{
    Axios.get("http://localhost:3001/getUsers").then((response)=>{
      setUserNameList(response.data);
    });
  }, []);

//Va a llamar al método de insersión de usuarios del backend a través de post
  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      userName: userName,
    }).then(() => {
      alert("Successful insert");
    });

    //Actualizamos la interfaz para que se muestre en pantalla el nuevo usuario agregado
    //(Similar al setState de flutter)
    setUserNameList([...userNamesList, {userName: userName}]);
  };

  const deleteUser = (user)=> {
    //A través de a url le pasamos el user
    Axios.delete(`http://localhost:3001/delete/${user}`);
  };

  const updateUser = (userName)=> {
    Axios.put("http://localhost:3001/update",{
      userName: userName,
      newUserName: newUserName
    }).then(() => {
      alert("Successful update");
    });
    setnewUserName("");
  };

  /*-----------------------INTERFAZ GRÁFICA-------------------------- */
  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className='form'>
        <label>User Name</label>
        <input 
        type="text" 
        name= "userName"
        onChange={(e)=>{
          setUserName(e.target.value);
        }}/>
        <label>review</label>
        <input 
        type="text" 
        name= "review"
        onChange={(e)=>{
          setReview(e.target.value);
        }}/>

        
        <button className= "btn btn-primary" onClick={addUser}><i className="fa-solid fa-plus"></i></button>

        {userNamesList.map((val)=>{
          return (
          <div className='card'>
            <h1>{val.userName}</h1>

            <button onClick={()=>{deleteUser(val.userName)}}>Delete</button>
            <input type={"text"} id="updateinput" onChange={(e)=> setnewUserName(e.target.value)}></input>
            <button  onClick={()=> {updateUser(val.userName)}}>Update</button>
          </div>
          );
        
        })}; 
      </div>
    </div>
  );
}

export default App;
