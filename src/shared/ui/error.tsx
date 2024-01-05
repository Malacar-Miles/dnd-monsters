import { Box } from "@mui/material";
import { Error } from "@mui/icons-material";
import PageContentContainer from "./page-content-container";

const ErrorPage = () => {
  return (
    <PageContentContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Error /> Error! Something went wrong.
      </Box>
    </PageContentContainer>
  );
};

export default ErrorPage;
