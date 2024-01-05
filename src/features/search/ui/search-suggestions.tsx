import { Menu, MenuItem } from "@mui/material";
import type { SearchSuggestion } from "../model/search-logic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const SearchSuggestions = ({
  searchSuggestions,
  individualResultPageUrl,
  anchorEl,
}: {
  searchSuggestions: SearchSuggestion[] | undefined;
  individualResultPageUrl: string;
  anchorEl: HTMLElement | null;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchSuggestions && searchSuggestions.length > 0 && anchorEl)
      setIsOpen(true);
    else setIsOpen(false);
  }, [searchSuggestions, anchorEl]);

  const generateNavigateFunction = (index: string) => {
    return function () {
      navigate(`/${individualResultPageUrl}/${index}`);
    };
  };

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
          onClick={generateNavigateFunction(suggestionItem.index)}
        >
          {suggestionItem.displayText}
        </MenuItem>
      ))}
    </Menu>
  );
};
