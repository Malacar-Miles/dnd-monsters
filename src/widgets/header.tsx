import { useNavigate, Link } from "react-router-dom";
import { AppBar, Typography, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserData, useReduxUserActions } from "entities/user";
import URL_PATHS from "app/url-paths";

const Header = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => navigate(URL_PATHS.signUp);
  const navigateToSignIn = () => navigate(URL_PATHS.signIn);

  const noDecoration = {
    textDecoration: "inherit",
    color: "inherit",
  };

  const AccountManagementControls = () => {
    const { currentUserId } = useSelector(selectUserData);
    const { signOutUser } = useReduxUserActions();
    if (currentUserId)
      return (
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          onClick={signOutUser}
        >
          Sign Out
        </Button>
      );
    else
      return (
        <>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            onClick={navigateToSignUp}
          >
            Sign Up
          </Button>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            onClick={navigateToSignIn}
          >
            Sign In
          </Button>
        </>
      );
  };

  return (
    <>
      <AppBar
        component="nav"
        position="static"
        sx={{ margin: "0.5rem 0", padding: "0.5rem 1rem" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">
            <Link to={URL_PATHS.root} style={noDecoration}>
              DnD Monsters
            </Link>
          </Typography>

          <Stack direction="row" gap="1rem" alignItems="center">
            <AccountManagementControls />
          </Stack>
        </Stack>
      </AppBar>
    </>
  );
};

export default Header;
