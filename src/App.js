import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Deposit from './depost_1';
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Navbar from "./Navbar";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/navbar" element={<Navbar/>}></Route>
        <Route exact path="/createaccount" element={<CreateAccount/>}></Route>
        <Route exact path="/deposit" element={<Deposit/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
