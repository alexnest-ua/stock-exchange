import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contacts,
  Portfolio,
  SignUp
} from "./components";
import WalletContext from './components/WalletContext.js';


function App(){
 

  const [walletAddress, setWalletAddress] = useState("");
  console.log("Wallet from App: ", walletAddress);

  console.log("wallet context App", WalletContext);

  const handleWalletAddressChange = (newWalletAddress) => {
    setWalletAddress(newWalletAddress);
    console.log("Wallet change from App: ", walletAddress);
  };

  return ( 
    <WalletContext.Provider value={{ walletAddress, onWalletAddressChange: handleWalletAddressChange }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </WalletContext.Provider>
   );
}

export default App;