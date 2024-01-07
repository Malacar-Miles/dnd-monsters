import { Typography, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useGetAllMonsterNamesQuery } from "entities/monster";
import {
  generateSearchResults,
  SearchResultCard,
  useReduxSearchHistoryActions,
} from "features/search";
import ErrorPage from "shared/ui/error";
import URL_PATHS from "app/url-paths";
import { constructMonsterImageUrl } from "entities/monster";
import { useSelector } from "react-redux";
import { selectUserData } from "entities/user";

const BigText = ({ children }: { children: React.ReactNode }) => (
  <Typography fontSize="1.5rem" textAlign="center">
    {children}
  </Typography>
);

const ResultsSkeleton = () => (
  <>
    <Skeleton height="3rem" />
    <Skeleton height="3rem" animation="wave" />
    <Skeleton height="3rem" animation={false} />
  </>
);

const MonsterSearchResults = ({
  searchQuery,
}: {
  searchQuery: string | undefined;
}) => {
  const { currentUserId } = useSelector(selectUserData);
  const { addSearchHistoryItem } = useReduxSearchHistoryActions();

  const { error, isLoading, data } = useGetAllMonsterNamesQuery();
  const allMonsters = data?.results;
  const searchResults =
    allMonsters && searchQuery
      ? generateSearchResults({
          searchableData: allMonsters,
          searchQuery,
          fieldToSearchBy: "name",
          indexField: "index",
        })
      : undefined;

  if (currentUserId && searchQuery && searchResults)
    addSearchHistoryItem(currentUserId, searchQuery, searchResults.length);

  return (
    <>
      {!searchQuery ? (
        <BigText>Please enter a search query</BigText>
      ) : error ? (
        <ErrorPage />
      ) : isLoading ? (
        <ResultsSkeleton />
      ) : (
        allMonsters &&
        searchResults && (
          <>
            <BigText>Results found: {searchResults.length}</BigText>
            <Grid container spacing="1rem" justifyContent="space-evenly">
              {searchResults.map((result) => (
                <Grid key={result.index}>
                  <SearchResultCard
                    item={result}
                    individualResultPageUrl={URL_PATHS.monsterRoot}
                    getImageUrlFunction={constructMonsterImageUrl}
                    fallbackImageUrl="\images\monster-fallback-image.png"
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
    </>
  );
};

export default MonsterSearchResults;
