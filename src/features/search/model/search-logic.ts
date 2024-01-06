import type { NavigateFunction } from "react-router-dom";

export const QUERY_THAT_RETURNS_ALL_ITEMS = "all";

export type DataItem = {
  [key: string]: string;
};

export type SearchResult = {
  displayText: string;
  index: string;
};

export const generateNavigateFunction = (
  index: string,
  individualResultPageUrl: string,
  navigate: NavigateFunction
) => {
  return function () {
    navigate(`${individualResultPageUrl}/${index}`);
  };
};

export const generateSearchResults = <T extends DataItem>({
  searchableData,
  searchQuery,
  fieldToSearchBy,
  indexField,
  maxResults,
}: {
  searchableData: T[];
  searchQuery: string;
  fieldToSearchBy: string;
  indexField: string;
  maxResults?: number;
}): SearchResult[] => {
  const processedSearchQuery = searchQuery.trim().toLowerCase();
  const result = [];

  const returnAllItems = searchQuery === QUERY_THAT_RETURNS_ALL_ITEMS;

  for (let i = 0; i < searchableData.length; i++) {
    if (maxResults && result.length > maxResults) break;

    const currentItem = searchableData[i];
    const stringToSearchIn = currentItem[fieldToSearchBy];

    if (
      returnAllItems ||
      (stringToSearchIn &&
        typeof stringToSearchIn === "string" &&
        stringToSearchIn.trim().toLowerCase().includes(processedSearchQuery))
    )
      result.push({
        displayText: stringToSearchIn,
        index: currentItem[indexField],
      });
  }

  return result;
};
