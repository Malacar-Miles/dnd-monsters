import { Paper } from "@mui/material";

const PageContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper component="main" elevation={3} square sx={{ padding: "0.5rem" }}>
      {children}
    </Paper>
  );
};

export default PageContentContainer;
