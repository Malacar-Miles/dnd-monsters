import { useGetAllMonsterNamesQuery } from "entities/monster";
import { SearchBar } from "features/search";

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
      searchResultsPageUrl="search"
      individualResultPageUrl="monster"
      prefilledQueryText={prefilledQueryText}
      placeholderText="Search by monster name"
    />
  );
};

export default MonsterSearchBar;
