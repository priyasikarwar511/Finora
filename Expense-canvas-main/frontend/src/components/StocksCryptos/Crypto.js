import "./Crypto.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./Components/Coin";
import Loading from "./Loading";
// import { search } from "../../utils/icons";

function App() {
  const [listCoins, setListCoins] = useState(null);
  const [searchCoin, setSearchCoin] = useState("");
  const [loading, setLoading] = useState(true);
  //continuous rendering the coins
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://openapiv1.coinstats.app/coins',
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'tBeMbaOXniKpQyNHmBbFtX87qKCtK7Xpk9Ha2pAUIR0='
      }
    };

    Axios
      .request(options)
      .then(function (response) {
        setListCoins(response.data.result)
        
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is complete
      });
  }, []);
  //filtering the coins based on search
  const searchCoins = listCoins?.filter((coin) => {
    return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
  });
  const [cryptos, setCryptos] = useState([]);
  //get the name of all the crypto coins
  // const CryptoList = () => {
  // useEffect(() => {
  //fetch all the crytocurrencies if any (saved in the db)
  const fetchData = async () => {
    try {
      const BASE_URL = "http://localhost:5000/api/user/";
      const response = await Axios.get(`${BASE_URL}getAllCoins`);
      setCryptos(response.data);
      console.log(cryptos);
    }
    catch (error) {
      console.error(error.response.data);
    }
  };
  fetchData();
  // }, [cryptos]);
  // }


  return (
    <div className="App">
      {loading ? (
        <Loading/>
      ) :(
      <>
      <div className="cryptohead">
        <input
          type="text"
          placeholder="Search any coin"
          onChange={(event) => {
            setSearchCoin(event.target.value);
          }}
        />

      </div>
      <div className="savedCoinsInDB">

        <h1> saved </h1>
        {searchCoins?.map((coin) => {
          // Display coins that are saved in the database
          const isSaved = cryptos && cryptos.some((crypto) => crypto.name === coin.name);

          if (isSaved) {
            return (

              <Coin
                  
                name={coin.name}
                icon={coin.icon}
                price={coin.price}
                symbol={coin.symbol}
                rank={coin.rank}
                websiteUrl={coin.websiteUrl}
                savestatus={true}
              />
            );
          }
          return null;
        })}
        <hr></hr>
      </div>
      <div className="cryptocontent">
        {searchCoins?.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
              rank={coin.rank}
              websiteUrl={coin.websiteUrl}
              savestatus={false}
            />
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}

export default App;