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
import MtnTransferReceiver from "./ATM/MtnTransferReceiver"
import MtnTransferAmount from "./ATM/MtnTransferAmount"
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import FingerPrint from "./ATM/FingerPrint";

const App = () => {

  return (
    <>
      <NotificationContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/navbar" element={<Navbar />}></Route>
        <Route exact path="/createaccount" element={<CreateAccount />}></Route>
        <Route exact path="/deposit" element={<Deposit />}></Route>

        {/* ATM Routes */}
        <Route path="/loading" element={<ProgressBar />} />
        <Route path="/keypad" element={<DialKeypad />} />
        <Route path="/fingerprint" element={<FingerPrint />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/balance" element={<BalanceEnquiry />} />
        <Route path="/statements" element={<MiniStatement />} />
        <Route path="/transferacc" element={<MtnTransferReceiver />} />
        <Route path="/transferamount" element={<MtnTransferAmount />} />
      </Routes>

    </>
  );
}

export default App;
