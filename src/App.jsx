import { useEffect, useRef, useState } from 'react';
import bnb from './assets/coins/bnb.png';
import solana from './assets/coins/solana.png';
import dodge from './assets/coins/dodge.png';
import bitcoin from './assets/coins/bitcoin.png';
import ripple from './assets/coins/ripple.png';
import ethereum from './assets/coins/ethereum.png';
import axios from 'axios';

const App = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const first = useRef(null);
  const [price, setPrice] = useState(null);
  const [delay, setDelay] = useState(null);

  const arr = [
    { name: 'Bitcoin', code: 'BTC', picture: bitcoin },
    { name: 'Ethereum', code: 'ETH', picture: ethereum },
    { name: 'BNB', code: 'BNB', picture: bnb },
    { name: 'Doge', code: 'DOGE', picture: dodge },
    { name: 'Solana', code: 'SOL', picture: solana },
    { name: 'Ripple', code: 'XRP', picture: ripple },
  ];

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addCoin = async (coinCode) => {
    const apiKey = '0E4F59F6-2139-402E-80D1-FD83073AD55D';
    try {
      const url = `https://rest.coinapi.io/v1/exchangerate/${coinCode.toUpperCase()}/USD`;
      const response = await axios.get(url, {
        headers: {
          'X-CoinAPI-Key': apiKey,
        },
      });
      const rate = response.data.rate.toString();
      const [decimal, float] = rate.split('.');
      const total = `${decimal}.${float.slice(0, 3)}`;
      setPrice(total);
    } catch (error) {
      setDelay(error.message);
      setTimeout(() => {
        setDelay(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const apiKey = '0E4F59F6-2139-402E-80D1-FD83073AD55D';
    const fetchData = async () => {
      const rates = {};
      try {
        for (const coin of arr) {
          const url = `https://rest.coinapi.io/v1/exchangerate/${coin.code}/USD`;
          const response = await axios.get(url, {
            headers: {
              'X-CoinAPI-Key': apiKey,
            },
          });
          const rate = response.data.rate.toString();
          const [decimal, float] = rate.split('.');
          rates[coin.code] = `${decimal}.${float.slice(0, 3)}`;
        }
        setExchangeRates(rates);
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-900 h-screen p-3 text-white">
        <div className="text-red-600">{delay}</div>
        {price && (
          <div className="w-80 border flex justify-around border-gray-700 px-7 py-10 rounded-xl mx-auto">
            <span>{input}</span>
            <span>{price}</span>
          </div>
        )}
        <div className="container w-full flex flex-col items-center justify-center mt-20 mx-auto text-2xl ">
          <h1>Welcome to our crypto platform</h1>
          <div className='flex justify-center flex-col gap-4 '>
            <input
              type="text"
              value={input}
              placeholder='pepe, bnb, btc'
              onChange={handleInput}
              className="bg-transparent border mx-5 border-gray-700 text-lg uppercase text-gray-600 p-2 mt-3 w-80 rounded-xl caret-gray-700 outline-none"
            />
            <button
              ref={first}
              onClick={() => addCoin(input)}
              className="border border-gray-700 w-80 m-auto text-gray-600 p-2 text-lg rounded-xl cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="container mx-auto overflow-y-scroll xl:overflow-hidden flex flex-wrap gap-7 p-5 justify-center items-center h-[35rem] sm:h-[22rem]">
            {arr.map((e, index) => (
              <div key={index} className="border w-80 border-gray-700 flex justify-between px-7 py-10 rounded-xl">
                <div className="flex justify-between gap-4">
                  <div className="w-6">
                    <img src={e.picture} alt={e.name} className="w-full h-full object-cover" />
                  </div>
                  <h1>{e.name}</h1>
                </div>
                <p>
                  {exchangeRates[e.code] ? exchangeRates[e.code] : 'Loading...'}
                  {error && <span className="text-red-500">Error</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
