import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { useGetCryptosQuery } from "../../services/cryptoApi";
import LoadingBar from "../LoadingBar/LoadingBar";
import EmptySearch from "../EmptySearch/EmptySearch";
import "./Cryptocurrencies.scss";

const Cryptocurrencies = () => {
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetCryptosQuery(100);

  const [coins, setCoins] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const searchRes = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setCoins(searchRes);
  }, [searchText, isFetching]);

  return (
    <div className="page cryptocurrencies">
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <h1 className="main-heading">Cryptocurrencies</h1>

          <div className="search-input">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="icon">
              <AiOutlineSearch />
            </div>
          </div>

          {coins?.length > 0 ? (
            <div className="coins">
              {coins?.map((coin) => (
                <div className="coin-card" key={coin.uuid}>
                  <Link key={coin.uuid} to={`/crypto/${coin.uuid}`}>
                    <div className="image">
                      <img src={coin.iconUrl} alt={coin.name} />
                    </div>
                    <h3 className="name">{coin.name}</h3>
                    <p>{coin.symbol}</p>
                    <h3 className="price">${millify(coin.price)}</h3>
                    <h3
                      className={`${
                        coin.change.toString().startsWith("-") ? "down" : "up"
                      }`}
                    >
                      {coin.change}%
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptySearch searchText={searchText} />
          )}
        </>
      )}
    </div>
  );
};

export default Cryptocurrencies;
