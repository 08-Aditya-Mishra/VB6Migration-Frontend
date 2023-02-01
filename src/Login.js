import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';

function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  //Notifications
  const showNotification = (type, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message);
        break;
      case 'warning':
        NotificationManager.warning(message);
        break;
      case 'error':
        NotificationManager.error(message);
        break;
      default:
        NotificationManager.info(message);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleCancel = () => {
    navigate('/')
  }
  
  const handleApi = (e) => {
    console.log({ userName, password })
    axios.post('https://localhost:7286/api/Admin/login', {
      username: userName,
      password: password
    })
      .then(result => {
        console.log(result)
        localStorage.setItem("accessToken", result.data.accessToken);
        console.log(localStorage);
        let auth = result.status
        if (auth === 200) {
          navigate('/navbar')
          showNotification('success', 'Your successfully logged in');
        }
      })
      .catch(error => {
        console.log(error)
        showNotification('error', 'Invalid Credentials');
      })
  }
  return (
    <div className="loginBG">
      <div className="mt-6 container col-sm-4 p-5 bg-dark text-white" style={{ backgroundColor:'#FFFFFF', marginTop: "70px", border: "1px solid black", borderRadius:"10px" }}>
        <h2><center>BANKER LOGIN</center></h2>
        <p class="text-white-50 mb-5"><center>Please enter your username and password!</center></p>
        
        <div class="form-outline form-white mb-4">
                <label class="form-label" for="typeEmailX">Username</label>
                <input value={userName} onChange={handleUserName} type="text" id="typeEmailX" class="form-control form-control-lg" />
        </div>

        <div class="form-outline form-white mb-4">
        <label class="form-label" for="typePasswordX">Password</label>
                <input value={password} onChange={handlePassword} type="password" id="typePasswordX" class="form-control form-control-lg" />
                
        </div>

        <br></br>

        
        <button onClick={handleApi} class="btn btn-outline-light btn-lg px-5" type="submit">LOGIN</button>&nbsp;
        <button onClick={handleCancel} class="btn btn-outline-light btn-lg px-5" type="submit">CANCEL</button>
      </div>
    </div>
  )
}
export default Login;
