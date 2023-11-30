import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

import tokensList from './assets.json' assert { type: 'json' };

async function getToken(wallet_address, token_address, symbol, id, decimals) {
  try {
    const response = await axios.get(process.env.apiURL, {
      params: {
        module: 'account',
        action: 'tokenbalance',
        contractaddress: token_address,
        address: wallet_address,
        tag: 'latest',
        apikey: process.env.apiKey
      },
    });

    if (response.data.status === '1') {
      const result = response.data.result;
      const gwei = (result / Math.pow(10, decimals));

      console.log('Token balance gwei:', gwei);
      return { id: id, symbol: symbol, balance: gwei };
    } else {
      console.error('Failed to fetch token data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

export async function getTokensList(wallet_address) {
    const resList = []
    for (const token of tokensList) {
        const tokenData = await getToken(wallet_address, token.address, token.symbol, token.id, token.decimals);
        if (tokenData) {
            resList.push(tokenData);
        }
    }

    resList.sort((a, b) => a.id - b.id);

    console.log(resList);
    return resList;
};

