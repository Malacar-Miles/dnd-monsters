import { Paper, TextField, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateSearchSuggestions,
  type DataItem,
} from "../model/search-logic";
import { SearchSuggestions } from "./search-suggestions";

type SearchBarProps<T> = {
  searchableData: T[] | undefined;
  fieldToSearchBy: string;
  indexField: string;
  searchResultsPageUrl: string;
  individualResultPageUrl: string;
  prefilledQueryText?: string;
  placeholderText: string;
};

export function SearchBar<T extends DataItem>(props: SearchBarProps<T>) {
  const {
    searchableData,
    fieldToSearchBy,
    indexField,
    searchResultsPageUrl,
    individualResultPageUrl,
    prefilledQueryText,
    placeholderText,
  } = props;

  const [queryText, setQueryText] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (prefilledQueryText) setQueryText(prefilledQueryText);
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(event.target.value);
    setAnchorEl(event.target);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURIComponent(queryText);
    const url = `/${searchResultsPageUrl}/${encodedSearchQuery}`;
    navigate(url);
  };

  const searchSuggestions =
    searchableData && queryText
      ? generateSearchSuggestions<T>({
          searchableData,
          searchQuery: queryText,
          fieldToSearchBy,
          indexField,
          maxSuggestions: 5,
        })
      : undefined;

  return (
    <Paper
      component="form"
      sx={{
        padding: "0.5rem",
        margin: "0.5rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <SearchIcon />
      <TextField
        type="search"
        value={queryText}
        onChange={handleChange}
        placeholder={placeholderText}
        size="small"
        sx={{ flexGrow: "1" }}
      />
      <SearchSuggestions
        searchSuggestions={searchSuggestions}
        individualResultPageUrl={individualResultPageUrl}
        anchorEl={anchorEl}
      />
      <Button type="submit" onClick={handleSubmit}>
        Search
      </Button>
    </Paper>
  );
}
