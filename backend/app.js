import express from 'express'
import cors from "cors";

import { getUsers, getUserById, getUserByWalletAddress, addUser } from './database.js'
import { getCountry, getCity } from './location.js'
import { verifySignature } from './metamask.js'
import { getTokensList } from "./tokens.js"

const app = express()
app.use(cors());
/*app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
*/ 
app.use(express.json())

app.get("/users", async (req, res) => {
  const notes = await getUsers()
  res.send(notes)
})

app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const note = await getUserById(id)
  res.send(note)
})

app.get("/users/:wallet_address", async (req, res) => {
    const wallet_address = req.params.wallet_address
    const user = await getUserByWalletAddress(wallet_address)
    res.send(user)
})

app.post("/addUser", async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'];
    console.log("ip: ", ip);
    
    const [country_name, country_isoCode, country_geonameId] = await getCountry(ip);
    const [city_name, city_geonameId] = await getCity(ip);
    
    var result = "error";
    var check = verifySignature(req.body.web3_wallet_address, req.body.signature)
    if(check){
      result = await addUser(
        req.body.web3_wallet_address,
        ip,
        country_name,
        country_isoCode,
        country_geonameId,
        city_name,
        city_geonameId,
        req.body.completed_connection,
        req.body.signature
      );
    }
    else{
      console.log("bad signature")
      throw new error("bad signature")
    }
    
    res.status(201).send(result);

    
  } catch (error) {
    const str = 'catched Error adding user:' + error
    console.error(str);
    res.status(202).send(str);
  }
});

app.get("/tokens", async (req, res) => {
  const tokens = await getTokensList(req.query.walletAddress)
  res.status(202).send(tokens)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8081, () => {
  console.log('Server is running on port http://localhost:8081/')
})