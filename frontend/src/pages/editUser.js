import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:3001/users/'

function CompEditUser() {
    const [userName, setUserName] = useState('');  
    const navigate = useNavigate();
    const {id} = useParams();

    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id, {
            userName: userName,
        })
        navigate('/')
    }

    useEffect( ()=>{
        getUserById()
    },[])

    const getUserById = async () => {
        console.log("HIII")
        const res = await axios.get(URI+id)
        console.log(res.data.userName)
        setUserName(res.data.userName)
    }

    return (
        <div>
        <h3>Edit POST</h3>
        <form onSubmit={update}>
            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                    value={userName}
                    onChange={ (e)=> setUserName(e.target.value)}
                    type="text"
                    className="form-control"                        
                />
            </div>         
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
    )

}

export default CompEditUser