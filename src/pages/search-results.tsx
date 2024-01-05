import { useParams } from "react-router-dom";
import { Stack, Typography, Skeleton } from "@mui/material";
import MonsterSearchBar from "widgets/monster-search-bar";
import { useGetAllMonsterNamesQuery } from "entities/monster";
import { generateSearchResults, SearchResultCard } from "features/search";
import ErrorPage from "shared/ui/error";

const SearchResultsPage = () => {
  const { searchQuery } = useParams();
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
        <Typography>Please enter a search query</Typography>
      ) : error ? (
        <ErrorPage />
      ) : isLoading ? (
        <Skeleton variant="rectangular" sx={{ minHeight: "50vh" }} />
      ) : (
        allMonsters &&
        searchResults && (
          <>
            <Typography>Results found: {searchResults.length}</Typography>
            <Stack direction="row" flexWrap="wrap" gap="1rem">
              {searchResults.map((result) => (
                <SearchResultCard
                  key={result.index}
                  item={result}
                  individualResultPageUrl="monster"
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
