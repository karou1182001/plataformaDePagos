import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const[userName, setUserName]= useState("");

  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className='form'>
        <label>Movie Name</label>
        <input 
        type="text" 
        name= "userName"
        onChange={(e)=>{
          setUserName(e.target.value);
        }}/>
        <label>review</label>
        <input type="text" name= "review"></input>
        
        <button>Submit</button>
      </div>
      
    </div>
  );
}

export default App;
