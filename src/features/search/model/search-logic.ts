export type DataItem = {
  [key: string]: string;
};

export type SearchSuggestion = {
  displayText: string;
  index: string;
};

export const generateSearchSuggestions = <T extends DataItem>({
  searchableData,
  searchQuery,
  fieldToSearchBy,
  indexField,
  maxSuggestions,
}: {
  searchableData: T[];
  searchQuery: string;
  fieldToSearchBy: string;
  indexField: string;
  maxSuggestions: number;
}): SearchSuggestion[] => {
  const processedSearchQuery = searchQuery.trim().toLowerCase();
  const result = [];

  for (let i = 0; i < searchableData.length; i++) {
    const currentItem = searchableData[i];
    const stringToSearchIn = currentItem[fieldToSearchBy];
    if (
      stringToSearchIn &&
      typeof stringToSearchIn === "string" &&
      stringToSearchIn.trim().toLowerCase().includes(processedSearchQuery)
    )
      result.push({
        displayText: stringToSearchIn,
        index: currentItem[indexField],
      });
    if (result.length >= maxSuggestions) break;
  }

  return result;
};
