import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { SearchResultCard } from "./search-result-card";
import { generateSearchResults } from "../model/search-logic";
import { useReduxSearchHistoryActions } from "../model/redux-slice-history";
import URL_PATHS from "app/url-paths";
import type { MonsterBasicData } from "entities/monster";
import type { SearchableEntity } from "shared/api/searchable-entity";
import { useEffect } from "react";
import { BigText } from "shared/ui/big-text";

export const SearchResults = ({
  searchQuery,
  searchableData,
  searchableEntity,
  createExtraAction,
  currentUserId,
  addToSearchHistory,
  hideResultCount,
}: {
  searchQuery: string;
  searchableData: MonsterBasicData[] | undefined;
  searchableEntity: SearchableEntity;
  createExtraAction?: (index: string) => JSX.Element;
  currentUserId: string | null;
  addToSearchHistory?: boolean;
  hideResultCount?: boolean;
}) => {
  const { addSearchHistoryItem } = useReduxSearchHistoryActions();

  const searchResults = searchableData
    ? generateSearchResults({
        searchableData: searchableData,
        searchQuery,
        fieldToSearchBy: "name",
        indexField: "index",
      })
    : null;

  useEffect(() => {
    if (addToSearchHistory && currentUserId && searchQuery && searchResults)
      addSearchHistoryItem(currentUserId, searchQuery, searchResults.length);
    // eslint-disable-next-line
  }, [currentUserId, searchResults]);

  const { getImageUrlFunction, fallbackImageUrl } = searchableEntity;

  return !searchResults ? null : (
    <>
      {!hideResultCount && (
        <BigText>Results found: {searchResults.length}</BigText>
      )}
      <Grid container spacing="1rem" justifyContent="space-evenly">
        {searchResults.map((result) => (
          <Grid key={result.index}>
            <SearchResultCard
              item={result}
              individualResultPageUrl={URL_PATHS.monsterRoot}
              getImageUrlFunction={getImageUrlFunction}
              fallbackImageUrl={fallbackImageUrl}
              extraAction={
                createExtraAction ? createExtraAction(result.index) : null
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
