import { Paper } from "@mui/material";

const PageContentContainer = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </Paper>
  );
};

export default PageContentContainer;
