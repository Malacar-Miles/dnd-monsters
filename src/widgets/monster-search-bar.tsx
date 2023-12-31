import { useGetAllMonsterNamesQuery } from "entities/monster";
import { SearchBar, QUERY_THAT_RETURNS_ALL_ITEMS } from "features/search";
import URL_PATHS from "app/url-paths";

const placeholderText = `Type "${QUERY_THAT_RETURNS_ALL_ITEMS}" to see all monsters`;

const MonsterSearchBar = ({
  prefilledQueryText,
}: {
  prefilledQueryText?: string;
}) => {
  const { data } = useGetAllMonsterNamesQuery();
  const searchableData = data ? data.results : undefined;

  return (
    <SearchBar
      searchableData={searchableData}
      fieldToSearchBy="name"
      indexField="index"
      searchResultsPageUrl={URL_PATHS.searchRoot}
      individualResultPageUrl={URL_PATHS.monsterRoot}
      prefilledQueryText={prefilledQueryText}
      placeholderText={placeholderText}
    />
  );
};

export default MonsterSearchBar;
