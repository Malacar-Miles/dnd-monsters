import { Button, Typography } from "@mui/material";
import { BookmarkAddOutlined, BookmarkAdded } from "@mui/icons-material";
import {
  isEntityInFavorites,
  selectFavorites,
  useReduxFavorites,
} from "../model/redux-slice-favorites";
import { selectUserData } from "entities/user";
import { useSelector } from "react-redux";

type FavoriteButtonProps = {
  componentSize: "small" | "normal";
  entityType: string;
  entityId: string;
};

export const FavoriteButton = (props: FavoriteButtonProps) => {
  const { currentUserId } = useSelector(selectUserData);
  const favoritesState = useSelector(selectFavorites);
  const { toggleFavoritesItem } = useReduxFavorites();

  if (!currentUserId) return null;

  const { componentSize, entityId, entityType } = props;
  const alreadyAddedToFavorites = isEntityInFavorites(favoritesState, {
    entityId,
    entityType,
    userId: currentUserId,
  });
  const buttonSize = componentSize === "small" ? "small" : "medium";
  const buttonText =
    componentSize === "small"
      ? null
      : alreadyAddedToFavorites
      ? "Remove from Favorites"
      : "Add to Favorites";

  const handleClick = () => {
    toggleFavoritesItem(currentUserId, entityType, entityId);
  };

  return (
    <Button size={buttonSize} onClick={handleClick}>
      {buttonText && <Typography marginRight="0.5rem">{buttonText}</Typography>}
      {alreadyAddedToFavorites ? <BookmarkAdded /> : <BookmarkAddOutlined />}
    </Button>
  );
};
