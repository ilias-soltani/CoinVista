import React from "react";

import { useGetCryptoNewsQuery } from "../../services/newsApi";
import "./News.scss";

const News = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: 10,
  });

  console.log(data);

  return <div>News</div>;
};

export default News;
