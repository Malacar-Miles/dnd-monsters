import { Paper, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  data: any[] | undefined;
  fieldToSearchBy: string;
  indexField: string;
  searchResultsPageUrl: string;
  individualResultPageUrl: string;
  prefilledQueryText?: string;
};

export const SearchBar = (props: SearchBarProps) => {
  const {
    data,
    fieldToSearchBy,
    indexField,
    searchResultsPageUrl,
    individualResultPageUrl,
    prefilledQueryText,
  } = props;

  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    if (prefilledQueryText) setQueryText(prefilledQueryText);
  }, []);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURIComponent(queryText);
    const url = searchResultsPageUrl + "/" + encodedSearchQuery;
    navigate(url);
  };

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        padding: "0.5rem",
        margin: "0.5rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        aria-label="Search"
        value={queryText}
        onChange={handleChange}
      />
      <Button type="submit" onClick={handleSubmit}>
        Search
      </Button>
    </Paper>
  );
};
