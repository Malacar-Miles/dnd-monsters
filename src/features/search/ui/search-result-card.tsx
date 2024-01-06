import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import {
  type SearchResult,
  generateNavigateFunction,
} from "../model/search-logic";
import { useNavigate } from "react-router-dom";

export const SearchResultCard = ({
  item,
  individualResultPageUrl,
}: {
  item: SearchResult;
  individualResultPageUrl: string;
}) => {
  const navigate = useNavigate();

  const handleClick = generateNavigateFunction(
    item.index,
    individualResultPageUrl,
    navigate
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" fontSize="2rem">
          {item.displayText}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          View Page
        </Button>
      </CardActions>
    </Card>
  );
};
