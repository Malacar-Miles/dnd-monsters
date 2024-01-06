import { Menu, MenuItem } from "@mui/material";
import { SearchResult, generateNavigateFunction } from "../model/search-logic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const SearchSuggestions = ({
  searchSuggestions,
  individualResultPageUrl,
  anchorEl,
  allowSearchSuggestions,
}: {
  searchSuggestions: SearchResult[] | undefined;
  individualResultPageUrl: string;
  anchorEl: HTMLElement | null;
  allowSearchSuggestions: boolean;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      allowSearchSuggestions &&
      searchSuggestions &&
      searchSuggestions.length > 0 &&
      anchorEl
    )
      setIsOpen(true);
    else setIsOpen(false);
  }, [allowSearchSuggestions, searchSuggestions, anchorEl]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      role="tooltip"
      open={isOpen}
      anchorEl={anchorEl}
      autoFocus={false}
      disableAutoFocus={true}
      onClose={handleClose}
    >
      {searchSuggestions?.map((suggestionItem) => (
        <MenuItem
          role="link"
          key={suggestionItem.index}
          onClick={generateNavigateFunction(
            suggestionItem.index,
            individualResultPageUrl,
            navigate
          )}
        >
          {suggestionItem.displayText}
        </MenuItem>
      ))}
    </Menu>
  );
};
