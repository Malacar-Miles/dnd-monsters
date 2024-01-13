import { useGetSpecificMonsterDataQuery } from "../api/dnd-monster-api";
import ContentNotFound from "shared/ui/content-not-found";
import ErrorPage from "shared/ui/error";
import StatTable from "shared/ui/stat-table";
import ArticleSkeleton from "shared/ui/article-skeleton";
import { FavoriteButton } from "features/favorites";
import {
  convertMonsterDescription,
  generateStatTables,
} from "../model/monster-logic";
import { MONSTER_ENTITY_TYPE } from "../model/monster-data";
import { Typography, Box, Stack, Paper, useMediaQuery } from "@mui/material";

export const MonsterDetails = ({ monsterIndex }: { monsterIndex: string }) => {
  const narrowScreen = useMediaQuery("(max-width:1060px)");
  const mobileScreen = useMediaQuery("(max-width:710px)");

  const { error, isLoading, data } =
    useGetSpecificMonsterDataQuery(monsterIndex);

  if (error)
    return (error as any)?.status === 404 ? <ContentNotFound /> : <ErrorPage />;
  else if (isLoading) return <ArticleSkeleton />;
  else if (data) {
    const { attributeTableData, otherStatsTableData } =
      generateStatTables(data);

    const monsterDescription = convertMonsterDescription(data?.desc);

    const monsterImageUrl = data?.image
      ? "https://www.dnd5eapi.co" + data.image
      : null;

    const noImageOrDescription = !monsterImageUrl && !monsterDescription;

    const showMainContentOnTop = narrowScreen || noImageOrDescription;

    const columnWidth = mobileScreen ? "100%" : "20rem";

    const MainContent = () => (
      <Stack justifyContent="center" alignItems="center" maxWidth={columnWidth}>
        <Typography variant="h2" textAlign="center">
          {data.name}
        </Typography>
        {monsterImageUrl && (
          <Paper
            component="img"
            src={monsterImageUrl}
            alt={data.name}
            width="100%"
          />
        )}
        {monsterDescription && <Typography>{monsterDescription}</Typography>}
        <FavoriteButton
          componentSize="normal"
          entityType={MONSTER_ENTITY_TYPE}
          entityId={data.index}
        />
      </Stack>
    );

    const Attributes = () => (
      <Box sx={{ minWidth: columnWidth, paddingTop: "1rem" }}>
        <StatTable data={attributeTableData} />
      </Box>
    );

    const MiscStats = () => (
      <Box
        sx={{
          minWidth: columnWidth,
          paddingTop: "1rem",
          marginBottom: "1rem",
          textTransform: "capitalize",
        }}
      >
        <StatTable data={otherStatsTableData} />
      </Box>
    );

    return showMainContentOnTop ? (
      <>
        <Stack direction="row" justifyContent="center">
          <MainContent />
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="1rem"
          justifyContent="space-evenly"
        >
          <Attributes />
          <MiscStats />
        </Stack>
      </>
    ) : (
      <>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="1rem"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Attributes />
          <MainContent />
          <MiscStats />
        </Stack>
      </>
    );
  } else return null;
};
