import React, { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import './App.css';

const App = () => {

  const [coins, updateCoins] = useState([])

  const fetchCoins = async() => {
    
    const restOperation = await get({
      apiName: "cryptoapi",
      path: "/coins"
    });

    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);
  };


  // Call fetchCoins function when component loads 
  useEffect(() => {
    fetchCoins()
  }, [])


  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;
