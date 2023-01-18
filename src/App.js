import { Routes, Route } from "react-router-dom"
import './App.css';
import Login from './Components/Login';
import Deposit from './Components/depost_1';
import Home from "./Components/Home";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/depost_1" element={<Deposit/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
