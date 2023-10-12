/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';
import * as token from '../token.js';

const provider = await detectEthereumProvider();

if (provider) {
  startApp(provider);
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/


const hexToDecimal = hex => parseInt(hex, 16);

const chainId = await window.ethereum.request({ method: 'eth_chainId' });

window.ethereum.on('chainChanged', handleChainChanged);

let currentChainId = null;
function handleChainChanged(chainId) {
  //window.location.reload();
  if (chainId === null) {
    console.log('Please connect to MetaMask.');
  } else if (chainId !== currentChainId) {
    currentChainId = chainId;
    showChainId.innerHTML = hexToDecimal(currentChainId);
    getEthereumBalance();
  }
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
window.ethereum.request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    console.error(err);
  });

window.ethereum.on('accountsChanged', handleAccountsChanged);

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    showAccount.innerHTML = currentAccount;
    getEthereumBalance();
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

const connectMetamaskButton = await document.querySelector('.connectMetamask');
const showAccount = document.querySelector('.showAccount');
const showChainId = document.querySelector('.showChainId');
const showEthBalance = document.querySelector('.showEthBalance');

connectMetamaskButton.addEventListener('click', () => {
  getAccount();
  getChanId();
  getEthereumBalance();
});

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
  showAccount.innerHTML = account;
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
  showChainId.innerHTML = hexToDecimal(currentChainId);
}

async function getEthereumBalance() {
  try {
    const balance = await token.getEthBalance(currentAccount);
    const balance_str = balance.toString()
    showEthBalance.innerHTML = balance_str.slice(0, balance_str.length - 4);
  } catch (error) {
    console.error(error);
  }
}