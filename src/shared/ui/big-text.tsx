import { Typography } from "@mui/material";

export const BigText = ({ children }: { children: React.ReactNode }) => (
  <Typography fontSize="1.5rem" textAlign="center">
    {children}
  </Typography>
);
