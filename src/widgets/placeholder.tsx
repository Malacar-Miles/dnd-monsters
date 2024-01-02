import { Box } from "@mui/material";
import { Construction } from "@mui/icons-material";
import PageContentContainer from "shared/ui/page-content-container";

const PlaceholderPage = ({ pageName }: { pageName: string }) => {
  return (
    <PageContentContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Construction /> The page "{pageName}" is under construction
      </Box>
    </PageContentContainer>
  );
};

export default PlaceholderPage;
