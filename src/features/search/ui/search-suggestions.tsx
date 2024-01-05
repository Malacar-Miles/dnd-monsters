import { Menu, MenuItem } from "@mui/material";
import type { SearchSuggestion } from "../model/search-logic";
import { useNavigate } from "react-router-dom";

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

  if (!searchSuggestions || searchSuggestions.length === 0) return null;

  const generateNavigateFunction = (index: string) => {
    return function () {
      navigate(`/${individualResultPageUrl}/${index}`);
    };
  };

  return (
    <Menu
      open={true}
      anchorEl={anchorEl}
      autoFocus={false}
      disableAutoFocus={true}
    >
      {searchSuggestions.map((suggestionItem) => (
        <MenuItem
          key={suggestionItem.index}
          onClick={generateNavigateFunction(suggestionItem.index)}
        >
          {suggestionItem.displayText}
        </MenuItem>
      ))}
    </Menu>
  );
};
