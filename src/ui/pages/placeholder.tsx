import { Box } from "@mui/material";
import { Construction } from "@mui/icons-material";

const PlaceholderPage = ({ pageName }: { pageName: string }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Construction /> The page "{pageName}" is under construction
    </Box>
  );
};

export default PlaceholderPage;
