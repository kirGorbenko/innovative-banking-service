import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {type CurrenciesResponse} from "@redux/types/currencies";

export const entryApi = createApi({
  reducerPath: "entryApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://api.coinbase.com/v2"}),
  endpoints: builder => ({
    getCurrencies: builder.query<CurrenciesResponse, string>({
      query: () => "currencies",
    }),
  }),
});

export const {useGetCurrenciesQuery} = entryApi;
