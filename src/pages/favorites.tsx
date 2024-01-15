import { MonsterFavorites } from "widgets/monster-favorites";
import { useSelector } from "react-redux";
import { selectUserData } from "entities/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import URL_PATHS from "app/url-paths";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { currentUserId } = useSelector(selectUserData);

  useEffect(() => {
    if (!currentUserId) navigate(URL_PATHS.signIn);
    // eslint-disable-next-line
  }, [currentUserId]);

  return currentUserId ? <MonsterFavorites /> : null;
};

export default FavoritesPage;
