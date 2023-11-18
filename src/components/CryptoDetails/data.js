import millify from "millify";
import { FaSackDollar, FaRankingStar } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { GiSprout, GiProgression, GiAbstract084 } from "react-icons/gi";
import { BiSolidChart, BiCheckDouble } from "react-icons/bi";
import { AiFillTrophy, AiOutlineAreaChart } from "react-icons/ai";

export const getStats = (cryptoDetails) => {
  const stats = [
    {
      title: "Price to USD",
      value: `$${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <FaSackDollar />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <FaRankingStar /> },
    {
      title: "24h Volume",
      value: `$${cryptoDetails && millify(cryptoDetails["24hVolume"])}`,
      icon: <IoSpeedometer />,
    },
    {
      title: "Market Cap",
      value: `$${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <FaMoneyBillWave />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiFillTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineAreaChart />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <BiSolidChart />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <BiCheckDouble />
      ) : (
        <HiOutlineXMark />
      ),
      icon: <GiSprout />,
    },
    {
      title: "Total Supply",
      value: `$${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <GiProgression />,
    },
    {
      title: "Circulating Supply",
      value: `$${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <GiAbstract084 />,
    },
  ];

  return { stats, genericStats };
};
