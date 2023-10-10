const etherscanApiUrl = 'https://api-goerli.etherscan.io/api';
const apiKey = '3R4D7JR467GY97RKPV5UE8BFQQP9MYCACC';

export async function getEthBalance(address) {  
    // Construct the API URL
    const apiUrl = `${etherscanApiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  
    // Make the API request and return a promise
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === '1' && data.message === 'OK') {
            const balance = data.result * (10 ** 18);
            return balance;
        } else {
            throw new Error(data.message);
        }
    });
}


  