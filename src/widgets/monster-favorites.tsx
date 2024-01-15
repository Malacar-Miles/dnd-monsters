import { SearchResults } from "features/search";
import { useSelector } from "react-redux";
import { useGetAllMonsterNamesQuery, monsterEntity } from "entities/monster";
import { selectUserData } from "entities/user";
import {
  selectFavorites,
  filterByFavorites,
  FavoriteButton,
} from "features/favorites";
import { BigText } from "shared/ui/big-text";
import { QUERY_THAT_RETURNS_ALL_ITEMS } from "features/search";

export const MonsterFavorites = () => {
  const { currentUserId } = useSelector(selectUserData);
  const favoritesData = useSelector(selectFavorites);

  const { isError, isLoading, data } = useGetAllMonsterNamesQuery();
  const allMonsters = data?.results;
  const filteredMonsters = filterByFavorites(
    currentUserId,
    monsterEntity.entityType,
    favoritesData,
    allMonsters
  );

  const createFavoriteButton = (monsterIndex: string) => (
    <FavoriteButton
      componentSize="small"
      entityType={monsterEntity.entityType}
      entityId={monsterIndex}
    />
  );

  return filteredMonsters?.length === 0 ? (
    <BigText>You don't have any favorites</BigText>
  ) : (
    <SearchResults
      searchQuery={QUERY_THAT_RETURNS_ALL_ITEMS}
      searchableData={filteredMonsters}
      searchableEntity={monsterEntity}
      currentUserId={currentUserId}
      hideResultCount
      isError={isError}
      isLoading={isLoading}
      createExtraAction={createFavoriteButton}
    />
  );
};
