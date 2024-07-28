import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { SiGooglemarketingplatform } from "react-icons/si";
import { Ri24HoursFill } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import millify from "millify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import { setActivePage } from "../../services/activePageSlice";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./Home.scss";

const Home = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCryptosQuery(10);

  const stats = data?.data?.stats;
  const coins = data?.data?.coins;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const statsList = [
    {
      title: "Total Cryptocurrencies",
      value: stats?.total,
      icon: BiSolidSelectMultiple,
    },
    {
      title: "Total Exchanges",
      value: millify(stats?.totalExchanges || 0),
      icon: FaMoneyBillWave,
    },
    {
      title: "Total Market Cap",
      value: millify(stats?.totalMarketCap || 0),
      icon: SiGooglemarketingplatform,
    },
    {
      title: "Total 24h Volume",
      value: millify(stats?.total24hVolume || 0),
      icon: Ri24HoursFill,
    },
    {
      title: "Total Markets",
      value: millify(stats?.totalMarkets || 0),
      icon: AiFillAppstore,
    },
  ];

  const changeActive = (name) => {
    sessionStorage.setItem("active-page", name);
    dispatch(setActivePage(name));
  };

  return (
    <div className="page home">
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="stats">
            <h1 className="main-heading">Global Crypto Stats</h1>
            <Swiper
              slidesPerView={4}
              spaceBetween={16}
              freeMode={true}
              loop={true}
              modules={[FreeMode, Autoplay]}
              className="mySwiper"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                450: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 3,
                },
                1225: {
                  slidesPerView: 4,
                },
              }}
            >
              {statsList.map((item) => (
                <SwiperSlide key={item.title}>
                  <div className="card">
                    <item.icon />
                    <h1>{item.value}</h1>
                    <h3>{item.title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="cryptos">
            <div className="heading">
              <h1>Top Cryptocurrencies</h1>
              <button className="btn-outline">
                <Link
                  to={"/cryptocurrencies"}
                  onClick={() => changeActive("Cryptocurrencies")}
                >
                  Show more
                </Link>
              </button>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((coin) => (
                    <tr
                      key={coin.uuid}
                      onClick={() => navigate(`/crypto/${coin.uuid}`)}
                    >
                      <td>
                        <div className="name">
                          <img src={coin.iconUrl} alt={coin.name} />
                          <h3>{coin.name}</h3>
                        </div>
                      </td>
                      <td>${millify(coin.price)}</td>
                      <td
                        className={`${
                          coin.change.toString().startsWith("-") ? "down" : "up"
                        }`}
                      >
                        {coin.change}%
                      </td>
                      <td>{millify(coin.marketCap)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
