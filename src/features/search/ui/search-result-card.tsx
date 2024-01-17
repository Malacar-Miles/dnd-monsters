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

const tinyScreenBreakpoint = 420;

export const SearchResultCard = ({
  item,
  individualResultPageUrl,
  getImageUrlFunction,
  fallbackImageUrl,
  extraAction,
}: {
  item: SearchResult;
  individualResultPageUrl: string;
  getImageUrlFunction?: (index: string) => string;
  fallbackImageUrl: string;
  extraAction?: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const tinyScreen = useMediaQuery(`(max-width:${tinyScreenBreakpoint}px)`);

  const headerStyle = tinyScreen ? { padding: "0.5rem" } : null;

  const cardImageUrl = getImageUrlFunction
    ? getImageUrlFunction(item.index)
    : fallbackImageUrl;

  const [imageUrl, setImageUrl] = useState(cardImageUrl);
  const [imageErrorTriggered, setImageErrorTriggered] = useState(false);

  const handleClick = generateNavigateFunction(
    item.index,
    individualResultPageUrl,
    navigate
  );

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (imageErrorTriggered || !getImageUrlFunction) return;
    event.stopPropagation();
    setImageErrorTriggered(true);
    setImageUrl(fallbackImageUrl);
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
      {getImageUrlFunction && (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={item.displayText}
          onError={handleImageError}
          sx={{ aspectRatio: "4.2/5" }}
        />
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
