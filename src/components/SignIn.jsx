import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import logo from "./images/logo.png";
import detectEthereumProvider from '@metamask/detect-provider';
import * as token from '../token.js';

const SignIn = () => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const connectMetamaskButtonRef = useRef(null);
  const showAccountRef = useRef(null);
  const showChainIdRef = useRef(null);
  const showEthBalanceRef = useRef(null);

  useEffect(() => {
    const initMetamask = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        startApp(provider);
        setMetamaskConnected(true);
      } else {
        console.log('Please install MetaMask!');
      }
    };

    if (buttonClicked) {
      initMetamask();
    }

    if (connectMetamaskButtonRef.current) {
      connectMetamaskButtonRef.current.addEventListener('click', () => {
        setButtonClicked(true);
      });
    }

  }, [buttonClicked]);

  function startApp(provider) {
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    getAccount();
    getChanId();
  }

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  const account = accounts[0];
  showAccountRef.current.innerHTML = account;
  getEthereumBalance(account);
  }

  async function getChanId() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  const currentChainId = chainId;
  showChainIdRef.current.innerHTML = hexToDecimal(currentChainId);
  }

  const hexToDecimal = hex => parseInt(hex, 16);

  async function getEthereumBalance(currentAccount) {
    try {
      const balance_str = await window.ethereum.request({
        "method": "eth_getBalance",
        "params": [
          currentAccount,
          "latest"
        ]
      });
      const balance = parseInt(balance_str);
      const eth = (balance / Math.pow(10, 18))// parse to ETH
      showEthBalanceRef.current.innerHTML = eth;
      //const balance = await token.getEthBalance(currentAccount);
      //const balance_str = balance.toString()
      //showEthBalanceRef.current.innerHTML = balance_str.slice(0, balance_str.length - 4);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <form className="form" action="index.html">
        <img src={logo} alt="Logo" />
        <h1>Login</h1>
        {!metamaskConnected && (
          <button ref={connectMetamaskButtonRef} className="connectMetamask">Connect Metamask</button>
        )}
        {metamaskConnected && (
          <>
            {/* Остальной код JSX, который должен отобразиться после подключения MetaMask */}
            <h2>Account: <span ref={showAccountRef} className="showAccount"></span></h2>
            <h2>Chain ID: <span ref={showChainIdRef} className="showChainId"></span></h2>
            <h2>Goerli Ethereum balance: <span ref={showEthBalanceRef} className="showEthBalance"></span></h2>
          </>
        )}
      </form>
    </div>
  );
}

export default SignIn;

