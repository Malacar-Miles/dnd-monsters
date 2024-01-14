import { Skeleton } from "@mui/material";
import { useGetAllMonsterNamesQuery, monsterEntity } from "entities/monster";
import { SearchResults } from "features/search";
import { FavoriteButton } from "features/favorites";
import ErrorPage from "shared/ui/error";
import { BigText } from "shared/ui/big-text";
import { useSelector } from "react-redux";
import { selectUserData } from "entities/user";

const ResultsSkeleton = () => (
  <>
    <Skeleton height="3rem" />
    <Skeleton height="3rem" animation="wave" />
    <Skeleton height="3rem" animation={false} />
  </>
);

const MonsterSearchResults = ({
  searchQuery,
}: {
  searchQuery: string | undefined;
}) => {
  const { currentUserId } = useSelector(selectUserData);

  const { error, isLoading, data } = useGetAllMonsterNamesQuery();
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
      ) : error ? (
        <ErrorPage />
      ) : isLoading ? (
        <ResultsSkeleton />
      ) : (
        allMonsters && (
          <SearchResults
            searchableEntity={monsterEntity}
            searchQuery={searchQuery}
            searchableData={allMonsters}
            createExtraAction={createFavoriteButton}
            currentUserId={currentUserId}
            addToSearchHistory
          />
        )
      )}
    </>
  );
};

export default MonsterSearchResults;
