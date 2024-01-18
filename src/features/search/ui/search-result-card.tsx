import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import {
  type SearchResult,
  generateNavigateFunction,
} from "../model/search-logic";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactComponent as Logo } from "shared/ui/logo.svg";

const tinyScreenBreakpoint = 420;

export const SearchResultCard = ({
  item,
  individualResultPageUrl,
  imageUrl,
  extraAction,
}: {
  item: SearchResult;
  individualResultPageUrl: string;
  imageUrl?: string;
  extraAction?: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const tinyScreen = useMediaQuery(`(max-width:${tinyScreenBreakpoint}px)`);

  const headerStyle = tinyScreen ? { padding: "0.5rem" } : null;

  const [imageErrorTriggered, setImageErrorTriggered] = useState(false);

  const handleClick = generateNavigateFunction(
    item.index,
    individualResultPageUrl,
    navigate
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (imageErrorTriggered) return;
    event.stopPropagation();
    setImageErrorTriggered(true);
  };

  const truncateHeaderText = {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={item.displayText}
        titleTypographyProps={{ sx: truncateHeaderText }}
        sx={headerStyle}
      />
      {imageUrl && !imageErrorTriggered ? (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={item.displayText}
          onError={handleImageError}
          sx={{ aspectRatio: "4.2/5" }}
        />
      ) : (
        <CardMedia sx={{ padding: "1rem", aspectRatio: "4.3/5" }}>
          <Logo />
        </CardMedia>
      )}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={handleClick}>
          {tinyScreen ? "View" : "View Page"}
        </Button>
        {extraAction}
      </CardActions>
    </Card>
  );
};
