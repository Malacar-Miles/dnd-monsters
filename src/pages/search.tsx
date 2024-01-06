import { useParams } from "react-router-dom";
import MonsterSearchBar from "widgets/monster-search-bar";
import MonsterSearchResults from "widgets/monster-search-results";
import URL_PATHS from "app/url-paths";

const SearchPage = () => {
  const urlParams = useParams();
  const searchQuery = urlParams[URL_PATHS.searchParam];
  return (
    <>
      <MonsterSearchBar prefilledQueryText={searchQuery} />
      <MonsterSearchResults searchQuery={searchQuery} />
    </>
  );
};

export default SearchPage;
