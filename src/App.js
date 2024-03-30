import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/pages/Home.js';
import Register from './components/pages/Register.js';
import WalletLanding from './components/pages/WalletLanding/WalletLanding.js';
import WalletAccess from './components/pages/WalletAccess/WalletAccess.js';
import LogIn from './components/pages/Login.js';
import AdminLogin from './components/pages/AdminLogin.js';
import Launch from './components/pages/Launch.js';
import Redirection from './components/pages/Redirection';
import BuySell from './components/pages/BuySell';
import AdminPanel from './components/pages/Admin/AdminPanel';
import UserInfo from './components/pages/UserInfo';
import Wallet from './components/pages/Wallet';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5Ww0NgOiwnF5Sq96YL7xKNP-xDaOcY-o",
  authDomain: "mgldefigo-2e810.firebaseapp.com",
  projectId: "mgldefigo-2e810",
  storageBucket: "mgldefigo-2e810.appspot.com",
  messagingSenderId: "245665090601",
  appId: "1:245665090601:web:a017631907afbddf20a038",
  measurementId: "G-4M6TN9LJZR"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(analytics)
function App() {
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/walletphrase/:id" element={<WalletAccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/walletMain" element={<WalletLanding />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/launchpad" element={< Launch/>} />
          <Route path="/ieo/:url" element={< Redirection/>} />
          <Route path="/wallet" element={< Wallet/>}>
            <Route path="/wallet/:id" element={< Wallet/>}>
              <Route path="/wallet/:id/:presaleToken/:chainId" element={< Wallet/>} />
            </Route>
          </Route>
          <Route path="/wallet/:id" element={< Wallet/>} />
          <Route path="/p2p" element={< BuySell/>} />
          <Route path="/userinfo" element={< UserInfo/>} />
          <Route path="/forgotpassword" element={< ForgotPassword/>} />
          <Route path="/resetpassword/:jxt" element={< ResetPassword/>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
