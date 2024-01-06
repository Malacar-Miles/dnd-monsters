import { useParams } from "react-router-dom";
import { Stack, Typography, Skeleton } from "@mui/material";
import MonsterSearchBar from "widgets/monster-search-bar";
import { useGetAllMonsterNamesQuery } from "entities/monster";
import { generateSearchResults, SearchResultCard } from "features/search";
import ErrorPage from "shared/ui/error";
import URL_PATHS from "app/url-paths";

const BigText = ({ children }: { children: React.ReactNode }) => (
  <Typography fontSize="2rem" textAlign="center">
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

const SearchResultsPage = () => {
  const urlParams = useParams();
  const searchQuery = urlParams[URL_PATHS.searchParam];
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
  return (
    <>
      <MonsterSearchBar prefilledQueryText={searchQuery} />

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
            <Stack gap="1rem">
              {searchResults.map((result) => (
                <SearchResultCard
                  key={result.index}
                  item={result}
                  individualResultPageUrl={URL_PATHS.monsterRoot}
                />
              ))}
            </Stack>
          </>
        )
      )}
    </>
  );
};

export default SearchResultsPage;
