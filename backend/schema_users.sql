CREATE DATABASE IF NOT EXISTS stock_exchange;

USE stock_exchange;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    web3_wallet_address VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255),
    country_name VARCHAR(255),
    country_isoCode VARCHAR(255),
    country_geonameId INT,
    city VARCHAR(255),
    city_name VARCHAR(255),
    city_geonameId INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_connection BOOLEAN DEFAULT false,
    completed_swap BOOLEAN DEFAULT false,
    signature VARCHAR(512),
    PRIMARY KEY (web3_wallet_address),
    UNIQUE KEY id (id)
);
