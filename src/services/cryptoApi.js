import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_CRYPTO_KEY,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => ({
        headers: cryptoApiHeaders,
        url: `coins?limit=${count}`,
      }),
    }),
    getCryptoDetails: builder.query({
      query: (id) => ({
        headers: cryptoApiHeaders,
        url: `coin/${id}`,
      }),
    }),
    getCryptoHistory: builder.query({
      query: ({ id, time }) => ({
        headers: cryptoApiHeaders,
        url: `coin/${id}/history?timePeriod=${time}`,
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
