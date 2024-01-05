import { useGetAllMonsterNamesQuery } from "entities/monster";
import { SearchBar } from "features/search";

const MonsterSearchBar = ({
  prefilledQueryText,
}: {
  prefilledQueryText?: string;
}) => {
  const { data } = useGetAllMonsterNamesQuery();

  return (
    <SearchBar
      data={data}
      fieldToSearchBy="name"
      indexField="index"
      searchResultsPageUrl="search"
      individualResultPageUrl="monster"
      prefilledQueryText={prefilledQueryText}
    />
  );
};

export default MonsterSearchBar;
