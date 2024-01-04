import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MonsterBasicData, MonsterExtendedData } from "../model/data";

export const dndMonsterApi = createApi({
  reducerPath: "dndMonsterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.dnd5eapi.co/api/monsters",
  }),
  endpoints: (builder) => ({
    getAllMonsterNames: builder.query<MonsterBasicData[], null>({
      query: () => "/",
    }),
    getSpecificMonsterData: builder.query<MonsterExtendedData, string>({
      query: (index) => `/${index}`,
    }),
  }),
});

export const { useGetAllMonsterNamesQuery, useGetSpecificMonsterDataQuery } =
  dndMonsterApi;
