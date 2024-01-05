import { useParams } from "react-router-dom";
import PlaceholderPage from "shared/ui/placeholder";
import MonsterSearchBar from "widgets/monster-search-bar";

const SearchResultsPage = () => {
  const { searchQuery } = useParams();
  return (
    <>
      <MonsterSearchBar prefilledQueryText={searchQuery} />
      <PlaceholderPage pageName="Search" />
    </>
  );
};

export default SearchResultsPage;
