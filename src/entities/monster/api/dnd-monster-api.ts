import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MonsterBasicData, MonsterExtendedData } from "../model/data";

export const dndMonsterApi = createApi({
  reducerPath: "dndMonsterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.dnd5eapi.co/api/monsters",
  }),
  endpoints: (builder) => ({
    getAllMonsterNames: builder.query<MonsterBasicData[], void>({
      query: () => "/",
      keepUnusedDataFor: 86400, // Keep for 24 hours
    }),
    getSpecificMonsterData: builder.query<MonsterExtendedData, string>({
      query: (index) => `/${index}`,
      keepUnusedDataFor: 3600, // Keep for 1 hour
    }),
  }),
});

export const { useGetAllMonsterNamesQuery, useGetSpecificMonsterDataQuery } =
  dndMonsterApi;
