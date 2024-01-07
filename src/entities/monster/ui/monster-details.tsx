import { useGetSpecificMonsterDataQuery } from "../api/dnd-monster-api";
import ContentNotFound from "shared/ui/content-not-found";
import ErrorPage from "shared/ui/error";
import StatTable from "shared/ui/stat-table";
import ArticleSkeleton from "shared/ui/article-skeleton";
import {
  convertMonsterDescription,
  generateStatTables,
} from "../model/monster-logic";
import { Typography, Box, Stack, Paper } from "@mui/material";

export const MonsterDetails = ({ monsterIndex }: { monsterIndex: string }) => {
  const { error, isLoading, data } =
    useGetSpecificMonsterDataQuery(monsterIndex);

  if (error)
    return (error as any)?.status === 404 ? <ContentNotFound /> : <ErrorPage />;
  else if (isLoading) return <ArticleSkeleton />;
  else if (data) {
    const { attributeTableProps, otherStatsTableProps } =
      generateStatTables(data);

    const monsterDescription = convertMonsterDescription(data?.desc);

    const monsterImageUrl = data?.image
      ? "https://www.dnd5eapi.co" + data.image
      : null;

    const Header = () => (
      <Typography variant="h2" textAlign="center">
        {data.name}
      </Typography>
    );

    const showImageOrDescription = Boolean(
      monsterImageUrl || monsterDescription
    );

    return (
      <>
        {!showImageOrDescription && <Header />}

        <Stack direction="row" flexWrap="wrap" justifyContent="space-evenly">
          {showImageOrDescription && (
            <Box sx={{ maxWidth: "20rem" }}>
              <Header />
              {monsterImageUrl && (
                <Paper
                  component="img"
                  src={monsterImageUrl}
                  alt={data.name}
                  width="100%"
                />
              )}
              {monsterDescription && (
                <Typography>{monsterDescription}</Typography>
              )}
            </Box>
          )}

          <Box sx={{ maxWidth: "20rem" }}>
            <StatTable {...attributeTableProps} />
          </Box>

          <Box sx={{ maxWidth: "20rem", textTransform: "capitalize" }}>
            <StatTable {...otherStatsTableProps} />
          </Box>
        </Stack>
      </>
    );
  } else return null;
};
