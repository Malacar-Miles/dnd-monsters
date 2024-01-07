import { SearchHistory } from "features/search";
import { useSelector } from "react-redux";
import { selectUserData } from "entities/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import URL_PATHS from "app/url-paths";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { currentUserId } = useSelector(selectUserData);

  useEffect(() => {
    if (!currentUserId) navigate(URL_PATHS.signIn);
    // eslint-disable-next-line
  }, [currentUserId]);

  return currentUserId ? <SearchHistory currentUser={currentUserId} /> : null;
};

export default HistoryPage;
