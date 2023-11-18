import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": process.env.REACT_APP_NEWS_KEY,
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com/";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (newsCategory, count) => ({
        url: `news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`,
        headers: newsApiHeaders,
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
