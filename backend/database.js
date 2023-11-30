import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users")
  return rows
}

export async function getUserById(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM users
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function getUserByWalletAddress(web3WalletAddress) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE web3_wallet_address = ?
    `, [web3WalletAddress])
    return rows[0]
  }

export async function addUser(web3_wallet_address, ip_address, country_name, country_isoCode, country_geonameId, city_name, city_geonameId, completed_connection, signature) {
  try {
    const result = await pool.query(`
      INSERT INTO users (
        web3_wallet_address, 
        ip_address, 
        country_name, 
        country_isoCode, 
        country_geonameId, 
        city_name, 
        city_geonameId, 
        created, 
        completed_connection,
        signature
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
    `, [web3_wallet_address, ip_address, country_name, country_isoCode, country_geonameId, city_name, city_geonameId, completed_connection, signature]);
    const id = result.insertId;
    console.log("Added user with id " + id);
    return "Added user with id " + id;
  } catch (error) {
    console.error('MySQL Error adding user:', error);
    throw new Error("MySQL Error adding user:" + error);
  }
}