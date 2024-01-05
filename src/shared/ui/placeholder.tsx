import { Box, Paper } from "@mui/material";
import { Construction } from "@mui/icons-material";

const PlaceholderPage = ({ pageName }: { pageName: string }) => {
  return (
    <Paper
      component="main"
      sx={{
        padding: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Construction /> The page "{pageName}" is under construction
      </Box>
    </Paper>
  );
};

export default PlaceholderPage;
