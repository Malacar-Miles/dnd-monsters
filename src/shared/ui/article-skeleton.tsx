import { Skeleton } from "@mui/material";

const ArticleSkeleton = () => {
  return (
    <Skeleton variant="rectangular" sx={{ width: "100%", minHeight: "50vh" }} />
  );
};

export default ArticleSkeleton;
