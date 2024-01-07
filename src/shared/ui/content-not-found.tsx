import { Box } from "@mui/material";
import { Error } from "@mui/icons-material";
import PageContentContainer from "./page-content-container";

const ContentNotFound = () => {
  return (
    <PageContentContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Error /> Content not found.
      </Box>
    </PageContentContainer>
  );
};

export default ContentNotFound;
