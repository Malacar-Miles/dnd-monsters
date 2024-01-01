import { Outlet, Link } from "react-router-dom";
import { AppBar, Typography, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectUserData,
  useReduxUserActions,
} from "../../model/redux-slice-users";

const Header = () => {
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
          <Button color="inherit" size="large" variant="outlined">
            <Link to="/sign-up" style={noDecoration}>
              Sign Up
            </Link>
          </Button>

          <Button color="inherit" size="large" variant="outlined">
            <Link to="/sign-in" style={noDecoration}>
              Sign In
            </Link>
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
            <Link to="/" style={noDecoration}>
              Placeholder Site Name
            </Link>
          </Typography>

          <Stack direction="row" gap="1rem" alignItems="center">
            <AccountManagementControls />
          </Stack>
        </Stack>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Header;
