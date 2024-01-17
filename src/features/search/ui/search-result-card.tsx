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

  const truncateText = {
    width: "10rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Card sx={{ width: "12rem" }}>
      <CardHeader
        title={item.displayText}
        titleTypographyProps={{ sx: truncateText }}
      />
      {getImageUrlFunction && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt={item.displayText}
          onError={handleImageError}
        />
      )}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={handleClick}>
          View Page
        </Button>
        {extraAction}
      </CardActions>
    </Card>
  );
};
