import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import "./Coin.css"
import {Modal} from './Modal'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false)
  const [coinName, setCoinName] = useState('')
  

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);



  const handleChange = e => {
    setSearch(e.target.value);
  };

  const openModal = (id) => {
    console.log(show)
    setShow(!show)
    setCoinName(id)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <>
          <Coin
            openModal={openModal}
            key={coin.id}
            id={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
          </>
        );
      })}
      {show ? <Modal coin={coinName} clicked={openModal} show={show}>My name is asdf</Modal> : null}
    </div>
    
  );
}

export default App;