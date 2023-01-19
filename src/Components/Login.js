import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import axios from 'axios';

function Login()
{
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleApi = () => {
    console.log({userName, password})
    axios.post('https://localhost:7286/api/Admin/login',{
      username : userName,
      password : password
    })
    .then(result => {
      console.log(result.status)
      let auth = result.status
      if(auth === 200)
      {
        navigate('/navbar')
      }
    })
    .catch(error => {
      console.log(error)
      alert('Invalid Credentials')
    })
  }
    return (
        <>
                <form className="mt-6 container col-sm-4 p-5" style={{marginTop:"100px",border:"1px solid black"}}>
                <h2>Login Here</h2>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Username</label>
                        <input value = {userName} onChange = {handleUserName} type = "text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        
                        
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input value = {password} onChange = {handlePassword} type = "password" className="form-control" id="exampleInputPassword1"/>
                        
                    </div>
                    <div className="d-grid gap-2 d-md-block">
                    <button onClick={handleApi} type="submit"  className="btn btn-dark"> Login</button>
                    </div>
                </form>
           
        </>
    )
}
export default Login;
