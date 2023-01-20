import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Deposit from './depost_1';
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Navbar from "./Navbar";
import DialKeypad from "./ATM/DialKeypad";
import Withdraw from "./ATM/Withdraw";
import BalanceEnquiry from "./ATM/BalanceEnquiry";
import LandingPage from "./ATM/LandingPage"
import MiniStatement from "./ATM/MiniStatement"
import ProgressBar from "./ATM/ProgressBar"
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/navbar" element={<Navbar />}></Route>
        <Route exact path="/createaccount" element={<CreateAccount />}></Route>
        <Route exact path="/deposit" element={<Deposit />}></Route>

        {/* ATM Routes */}
        <Route path="/keypad" element={<DialKeypad />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/balance" element={<BalanceEnquiry />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/statements" element={<MiniStatement />} />
        <Route path="/loading" element={<ProgressBar />} />
      </Routes>

    </>
  );
}

export default App;
