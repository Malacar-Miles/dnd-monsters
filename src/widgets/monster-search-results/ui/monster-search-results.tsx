import { useGetAllMonsterNamesQuery, monsterEntity } from "entities/monster";
import { SearchResults } from "features/search";
import { FavoriteButton } from "features/favorites";
import { BigText } from "shared/ui/big-text";
import { useSelector } from "react-redux";
import { selectUserData } from "entities/user";

const MonsterSearchResults = ({
  searchQuery,
}: {
  searchQuery: string | undefined;
}) => {
  const { currentUserId } = useSelector(selectUserData);

  const { isError, isLoading, data } = useGetAllMonsterNamesQuery();
  const allMonsters = data?.results;

  const createFavoriteButton = (monsterIndex: string) => (
    <FavoriteButton
      componentSize="small"
      entityType={monsterEntity.entityType}
      entityId={monsterIndex}
    />
  );

  return (
    <>
      {!searchQuery ? (
        <BigText>Please enter a search query</BigText>
      ) : (
        allMonsters && (
          <SearchResults
            searchableEntity={monsterEntity}
            searchQuery={searchQuery}
            searchableData={allMonsters}
            createExtraAction={createFavoriteButton}
            currentUserId={currentUserId}
            addToSearchHistory
            isError={isError}
            isLoading={isLoading}
          />
        )
      )}
    </>
  );
};

export default MonsterSearchResults;
