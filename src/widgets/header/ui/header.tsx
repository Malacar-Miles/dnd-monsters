import { Link } from "react-router-dom";
import { AppBar, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserData, UserAvatar } from "entities/user";
import URL_PATHS from "app/url-paths";
import { NavMenu, type NavMenuItem } from "./nav-menu";
import { ReactComponent as Logo } from "./logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

const noDecoration = {
  textDecoration: "inherit",
  color: "inherit",
};

const mobileBreakpoint = 880;
const tinyScreenBreakpoint = 420;

const navItemsForSignedOutUser: NavMenuItem[] = [
  { title: "Search", path: URL_PATHS.searchRoot },
  {
    title: "Sign Up",
    path: URL_PATHS.signUp,
  },
  {
    title: "Sign In",
    path: URL_PATHS.signIn,
  },
];

const navItemsForSignedInUser: NavMenuItem[] = [
  { title: "Search", path: URL_PATHS.searchRoot },
  {
    title: "History",
    path: URL_PATHS.history,
  },
  {
    title: "Favorites",
    path: URL_PATHS.favorites,
  },
];

const Header = () => {
  const { currentUserId } = useSelector(selectUserData);
  const tinyScreen = useMediaQuery(`(max-width:${tinyScreenBreakpoint}px)`);

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
          <Link to={URL_PATHS.root} style={noDecoration}>
            <Typography
              variant="h3"
              fontSize="2rem"
              sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Logo style={{ width: "2.5rem", height: "2.5rem" }} />{" "}
              {!tinyScreen && "DnD Monsters"}
            </Typography>
          </Link>

          <Stack direction="row" gap="1rem" alignItems="center">
            {currentUserId ? (
              <>
                <NavMenu
                  mobileBreakpoint={mobileBreakpoint}
                  navMenuItems={navItemsForSignedInUser}
                />
                <UserAvatar />
              </>
            ) : (
              <NavMenu
                mobileBreakpoint={mobileBreakpoint}
                navMenuItems={navItemsForSignedOutUser}
              />
            )}
          </Stack>
        </Stack>
      </AppBar>
    </>
  );
};

export default Header;
