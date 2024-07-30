import React, { useState } from "react";
import millify from "millify";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GoArrowUpRight } from "react-icons/go";
import NotFound from "../NotFound/NotFound";

import {
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import LineChart from "./LineChart";
import { getStats } from "./data";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./CryptoDetails.scss";

const CryptoDetails = () => {
  const { id } = useParams();

  const [chartTime, setChartTime] = useState("7d");

  const { data, isLoading, isError } = useGetCryptoDetailsQuery(id);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    id,
    time: chartTime,
  });

  const cryptoDetails = data?.data?.coin;

  const { data: cryptoData, isLoading: isLoading2 } = useGetCryptosQuery(
    cryptoDetails?.links.length - 1
  );

  const cryptoList = cryptoData?.data?.coins;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const { stats, genericStats } = getStats(cryptoDetails);

  if (isError && !isLoading) {
    return <NotFound />;
  }

  return (
    <div className="page">
      {isLoading || isLoading2 ? (
        <LoadingBar />
      ) : (
        <div className="main-content">
          <div className="box coin-heading">
            <div className="icon">
              <img src={cryptoDetails.iconUrl} alt="coin" />
            </div>
            <div className="text">
              <h1>
                {cryptoDetails.name} ({cryptoDetails.symbol})
              </h1>
              <p>{cryptoDetails.description}</p>
            </div>
          </div>

          <div className="box chart">
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chartTime}
                label="Time Period"
                onChange={(e) => setChartTime(e.target.value)}
              >
                {time.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LineChart
              currentPrice={millify(cryptoDetails.price)}
              coinName={cryptoDetails.name}
              coinHistory={coinHistory}
            />
          </div>

          <div className="stats-continer">
            <div className="box coin-stats">
              <h2>{cryptoDetails.name} value statistics</h2>
              <div className="coin-stats-continer">
                {stats.map((item) => (
                  <div className="coin-stats-itme" key={item.title}>
                    <div className="title">
                      <div className="icon">{item.icon}</div>
                      <span>{item.title}</span>
                    </div>

                    <span className="value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="box generic-stats">
              <h2>Other statistics</h2>
              <div className="coin-stats-continer">
                {genericStats.map((item) => (
                  <div className="coin-stats-itme" key={item.title}>
                    <div className="title">
                      <div className="icon">{item.icon}</div>
                      <span>{item.title}</span>
                    </div>

                    <span className="value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="info-continer">
            <div className="box links">
              <h2>{cryptoDetails.name} links</h2>
              <div className="links-group">
                {cryptoDetails.links.map((link, i) => (
                  <div className="link-item" key={link.name + i}>
                    <span>{link.type}</span>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                      <div className="icon">
                        <GoArrowUpRight />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="box coins">
              <h2>Trending cryptos</h2>
              <div className="coins-group">
                {cryptoList?.map((coin, i) =>
                  coin.name !== cryptoDetails.name &&
                  i !== cryptoList.length - 1 ? (
                    <div className="coin-item" key={coin.uuid}>
                      <div className="info">
                        <div className="icon">
                          <img src={coin.iconUrl} alt={coin.name} />
                        </div>
                        <div className="text">
                          <span>{coin.name}</span>
                          <p>{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="numbers">
                        <span>${millify(coin.price)}</span>
                        <span
                          className={`${
                            coin.change.toString().startsWith("-")
                              ? "down"
                              : "up"
                          }`}
                        >
                          {coin.change}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDetails;
