import {
  dndMonsterApi,
  useGetAllMonsterNamesQuery,
  useGetSpecificMonsterDataQuery,
} from "./api/dnd-monster-api";
import type {
  MonsterBasicData,
  MonsterExtendedData,
  Attributes,
} from "./model/data";

export {
  dndMonsterApi,
  useGetAllMonsterNamesQuery,
  useGetSpecificMonsterDataQuery,
  type MonsterBasicData,
  type MonsterExtendedData,
  type Attributes,
};
