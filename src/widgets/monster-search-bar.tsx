import { useGetAllMonsterNamesQuery } from "entities/monster";
import { SearchBar } from "features/search";
import URL_PATHS from "app/url-paths";

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
      placeholderText="Search by monster name"
    />
  );
};

export default MonsterSearchBar;
