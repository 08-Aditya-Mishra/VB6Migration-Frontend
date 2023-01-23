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
    axios.post('http://localhost:5178/api/Admin/login', {
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
      <div className="mt-6 container col-sm-4 p-5" style={{ backgroundColor:'#FFFFFF', marginTop: "100px", border: "1px solid black" }}>
        <h2>Login Here</h2>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label-login">Username</label>
          <input value={userName} onChange={handleUserName} type="text" className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label-login">Password</label>
          <input value={password} onChange={handlePassword} type="password" className="form-control" id="exampleInputPassword1" />

        </div>
        <button onClick={handleApi} className="btn btn-light"> Login</button>&nbsp;&nbsp;
        <button onClick={handleCancel} className="btn btn-dark"> Cancel</button>
      </div>
    </div>
  )
}
export default Login;
