import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import {
  type SearchResult,
  generateNavigateFunction,
} from "../model/search-logic";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactComponent as Logo } from "shared/ui/logo.svg";

const tinyScreenBreakpoint = 420;

const ImageLoader = ({
  imageUrl,
  alt,
}: {
  imageUrl: string | undefined;
  alt: string;
}) => {
  const [imageErrorTriggered, setImageErrorTriggered] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (imageErrorTriggered) return;
    event.stopPropagation();
    setImageErrorTriggered(true);
    setImageIsLoading(false);
  };

  const handleImageLoad = () => {
    setImageIsLoading(false);
  };

  return (
    <>
      {imageIsLoading && imageUrl && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            zIndex: "2",
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {imageUrl && !imageErrorTriggered ? (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={alt}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sx={{ height: "100%", width: "100%" }}
        />
      ) : (
        <CardMedia sx={{ padding: "1rem", height: "100%", width: "100%" }}>
          <Logo />
        </CardMedia>
      )}
    </>
  );
};

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
  const [isInView, setIsInView] = useState(false);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!boxRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) setIsInView(true);
    });

    observer.observe(boxRef.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [boxRef]);

  const tinyScreen = useMediaQuery(`(max-width:${tinyScreenBreakpoint}px)`);
  const headerStyle = tinyScreen ? { padding: "0.5rem" } : null;

  const handleClick = generateNavigateFunction(
    item.index,
    individualResultPageUrl,
    navigate
  );

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

      <Box
        ref={boxRef}
        sx={{
          width: "100%",
          aspectRatio: "4.2/5",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isInView && <ImageLoader imageUrl={imageUrl} alt={item.displayText} />}
      </Box>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={handleClick}>
          {tinyScreen ? "View" : "View Page"}
        </Button>
        {extraAction}
      </CardActions>
    </Card>
  );
};
