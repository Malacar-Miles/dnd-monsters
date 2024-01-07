import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSearchHistory } from "../model/redux-slice-history";
import URL_PATHS from "app/url-paths";
import type { HistoryDataEntry } from "../model/redux-slice-history";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getTimeFromNow = (timestamp: string) => dayjs(timestamp).fromNow();

export const SearchHistory = ({ currentUser }: { currentUser: string }) => {
  const searchHistory = useSelector(selectSearchHistory)[currentUser];

  const SearchHistoryEntry = ({
    searchHistoryItem,
  }: {
    searchHistoryItem: HistoryDataEntry;
  }) => {
    const { searchQuery, resultCount, timestamp } = searchHistoryItem;
    const linkPath =
      URL_PATHS.searchRoot + "/" + encodeURIComponent(searchQuery);
    const resultOrResults = resultCount === 1 ? "result" : "results";
    const textAfterLink = `: ${resultCount} ${resultOrResults}, ${getTimeFromNow(
      timestamp
    )}`;
    return (
      <Typography fontSize="2rem">
        <Link to={linkPath}>{searchQuery}</Link>
        {textAfterLink}
      </Typography>
    );
  };

  // This workaround is needed because TS doesn't
  // know .toReversed method exists.
  const reversedSearchHistory = (
    searchHistory as any
  ).toReversed() as HistoryDataEntry[];

  return (
    <>
      <Typography variant="h2" textAlign="center">
        Search History
      </Typography>

      {!searchHistory || searchHistory.length === 0 ? (
        <Typography fontSize="1.5rem" textAlign="center">
          Your search history is empty.
        </Typography>
      ) : (
        reversedSearchHistory.map((searchHistoryItem, index) => (
          <SearchHistoryEntry
            key={index}
            searchHistoryItem={searchHistoryItem}
          />
        ))
      )}
    </>
  );
};
