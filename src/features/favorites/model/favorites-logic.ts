import type { AllUsersFavorites } from "./redux-slice-favorites";
import type { EntityBasicData } from "shared/api/searchable-entity";

export const filterByFavorites = (
  userId: string | null | undefined,
  entityType: string | undefined,
  allUsersFavorites: AllUsersFavorites | undefined,
  dataToFilter: EntityBasicData[] | undefined
) => {
  if (!userId || !entityType || !allUsersFavorites || !dataToFilter)
    return undefined;

  const favorites = allUsersFavorites?.[userId]?.[entityType];
  if (!favorites) {
    console.log("WARNING: unable to process favorites data.");
    return undefined;
  }

  return dataToFilter.filter((item) => favorites.includes(item.index));
};
