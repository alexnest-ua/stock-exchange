import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { styles } from './styles/Style_portfolio.jsx';
import WalletContext from './WalletContext.js';

function Portfolio() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const { walletAddress, onWalletAddressChange } = useContext(WalletContext);
  console.log("Wallet from Portfolio: ", walletAddress);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await axios.get("/tokens", {
          params: {
            walletAddress: walletAddress,
          }
        });

        console.log(data);

        if (data.status === 202) {
          setTokens(data.data);
        } else {
          console.error('Failed to fetch token data');
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [walletAddress]);

  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 10;

  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokens.slice(indexOfFirstToken, indexOfLastToken);

  const totalPages = Math.ceil(tokens.length / tokensPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tokens portfolio</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentTokens.length > 0 ? (
            <ul style={styles.list}>
              {currentTokens.map((token) => (
                <li key={token.id} style={styles.listItem}>{`${token.symbol}: ${token.balance}`}</li>
              ))}
            </ul>
          ) : (
            <p style={styles.noTokensMessage}>No available tokens</p>
          )}
          {tokensPerPage > 0 && (
            <div style={styles.pagination}>
              <p>
                Page {currentPage} Of {totalPages}
              </p>
              <button
                style={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <button
                style={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Portfolio;