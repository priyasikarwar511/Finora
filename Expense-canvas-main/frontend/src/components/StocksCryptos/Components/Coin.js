import React from "react";
import './Coin.css';
import axios from 'axios';
import { useState } from "react";


function Coin({ name, icon, price, symbol, rank, websiteUrl ,savestatus}) {
    const [saved,setsave]=useState(savestatus);
    const [cryptoName, setCryptoName] = useState('');
    const saveCoin = async () => {
        //it will save the coin in the person's Account 
     

        console.log("button clicked");
        try {
            // const response = await axios.post('/api/addCrypto', { cryptoName });
            setCryptoName(name);
            console.log(cryptoName);
            const BASE_URL = "http://localhost:5000/api/user/";
            const response = await axios.post(`${BASE_URL}addCrypto`, { name: cryptoName });
            console.log(response.data);
           
        }
        catch (error) {
            console.error(error.response.data.message);
            // console.log('error occured')
        }

    };
  
    return (

        <div className="coin">
            {/* Adding a button so that we can pin a particular cryptocurrency */}         
            <button id="add" onClick={saveCoin} disabled={saved}><span>ADD</span></button>
        
            <h2>Name:{name}</h2>
            <img src={icon} alt="coin" />
            <h3>Price :{price}</h3>

            <h4>Symbol:{symbol}</h4>
            <h2>Rank:{rank}</h2>
            {/* <h2>Website Url:{websiteUrl}</h2> */}
            <a href={websiteUrl}>{websiteUrl}</a>
        </div>
    );
    }
export default Coin;