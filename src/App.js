import React, { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import './App.css';
import { GitHubBornOn } from './GitHubBornOn';

const App = () => {

  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  //Create a variable  for loading message
  const [loading, updateLoading] = useState(true);

  const fetchCoins = async () => {

    updateLoading(true);

    const { limit, start } = input;

    const restOperation = await get({
      apiName: "cryptoapi",
      path: `/coins?limit=${limit}&start=${start}`
    });

    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);

    updateLoading(false);
  };


  // Call fetchCoins function when component loads 
  useEffect(() => {
    fetchCoins()
  }, [])


  return (
    <div className="App">

      <input
        placeholder="start"
        onChange={e => updateInputValues('start', e.target.value)}
      />
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />

      <button onClick={fetchCoins}>Fetch Coins</button>

      {loading && <h2>Loading...</h2>}
      {
        !loading && coins.map((coin, index) => (
          <div>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
      <GitHubBornOn/>
    </div>
  );
}

export default App;
