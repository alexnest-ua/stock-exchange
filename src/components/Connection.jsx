import { useEffect, useState } from 'react';
import ETH_logo from "./images/ETH.png";

import { 
  containerStyle,
  buttonStyle,
  leftStatus,
  statusIconConnected,
  statusIconDisconnected,
  ethLogo,
  walletFont,
  ethText
} from './Style_button.jsx';


function ConnectionButton() {

  const [ walletAccount, setWalletAccount ] = useState('');
  const [ currentChain, setCurrentChain ] = useState('');
  const [ isConnected, setIsConnected ] = useState(false);
  const [ ethBalance, setEthBalance ] = useState(null);

  const hexToDecimal = hex => parseInt(hex, 16);
  const strSwitchToGoerli = "Click to switch to Goerli!";

  // Initialize the application and MetaMask Event Handlers
  useEffect(() => {

    // Setup Listen Handlers on MetaMask change events
    if(typeof window.ethereum !== 'undefined') {
        // Add Listener when accounts switch
        window.ethereum.on('accountsChanged', (accounts) => {

          console.log('Account changed: ', accounts[0]);
          setWalletAccount(accounts[0]);

        })
        
        // Do something here when Chain changes
        window.ethereum.on('chainChanged', (chainId) => {
          console.log('Chain ID changed: ', chainId);
          chainId = hexToDecimal(chainId);
          if (chainId == 5){
            setCurrentChain(chainId);
          }
          else {
            setCurrentChain(strSwitchToGoerli);
          }

        })

    } else {

        alert('Please install MetaMask to use this service!');

    }
  }, []);

  // Used to see if the wallet is currently connected to the application
  // If an account has been accessed with MetaMask, then the wallet is connected to the application.
  useEffect(() => {
      setIsConnected(walletAccount ? true : false)
  }, [walletAccount]);

  // Connect the Wallet to the current selected account in MetaMask. 
  // Will generate a login request for user if no account is currently connected to the application
  const handleConnectWallet = async () => {

      console.log('Connecting MetaMask...');

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0].slice(0, 4) + "..." + accounts[0].slice(-5);

      
      console.log('Account: ', account);
      setWalletAccount(account);
      handleChainId();
      handleGetBalance();
  }

  // Handle Disconnected. Removing the state of the account connected 
  // to your app should be enough to handle Disconnect with your application.
  const handleDisconnect = async () => {

      console.log('Disconnecting MetaMask...');
      setIsConnected(false);
      setWalletAccount('');
  }


  // Get the Accounts current Balance and convert to Wei and ETH
  const handleGetBalance = async () => {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const balance  = await window.ethereum.request({ method: 'eth_getBalance' , params: [ account, 'latest' ]});

    // // Returns a hex value of Wei
    const wei = parseInt(balance, 16);
    const eth = (wei / Math.pow(10, 18));// parse to ETH

    setEthBalance({ eth });
  }
 
  const handleChainId = async() => {
    let chainId = await window.ethereum.request({ method: 'eth_chainId' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    chainId = hexToDecimal(chainId);
    if (chainId == 5){
        setCurrentChain(chainId);
    }
    else {
        setCurrentChain(strSwitchToGoerli);
    }
  }


  const handleSwitchToGoerliChain = async() => {
    await window.ethereum.request({
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": "0x5" // switch to goerli chain
          }
        ]
      })
      .catch((err) => {
        // In the last Metamask(it updates automatically) version Goerli testnet chain is added automatically
        if (err.code === 4902) {
            console.error(err + "add Goerli testnet chain");
        } else {
            console.error(err);
        }
    });
  }



  return (
    <div className="connect-button" onClick={!isConnected ? handleConnectWallet : handleDisconnect} style={{...buttonStyle}}>

        {isConnected && (
        <>
            {(currentChain == 5) && (
            <>
                <div className="status-icon connected" style={statusIconConnected}></div>
                <div className="right-status" style={walletFont}>{walletAccount}</div>
                <img src={ETH_logo} style={ethLogo} />
                <div className="eth-text" style={ethText}> { ethBalance?.eth % 1 != 0 ? ethBalance?.eth.toFixed(5) : ethBalance?.eth} ETH</div>
                <div className="ChainID" style={ethText}> Chain: Goerli Testnet </div>
            </>
            )}
            {(currentChain != 5) && (
            <>
                <div className="status-icon connected" style={statusIconConnected}></div>
                <div className="right-status" style={walletFont}>{walletAccount}</div>
                <div className="eth-text" onClick={handleSwitchToGoerliChain} style={ethText}> {strSwitchToGoerli} </div>
            </>
            )}
        </>
        )}
        {!isConnected && (
        <>
            <div className="status-icon disconnected" style={statusIconDisconnected}></div>
            <div className="right-status" style={{width: '100%'}}>Connect Metamask</div>
        </>
        )}                          
    </div>
  );
}

export default ConnectionButton;

