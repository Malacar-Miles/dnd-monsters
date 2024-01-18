import MonsterSearchBar from "widgets/monster-search-bar";
import { Paper, Stack, Typography, Link, Button, Box } from "@mui/material";
import { ReactComponent as Logo } from "shared/ui/logo.svg";
import { useNavigate } from "react-router-dom";
import URL_PATHS from "app/url-paths";
import { QUERY_THAT_RETURNS_ALL_ITEMS } from "features/search";
import useMediaQuery from "@mui/material/useMediaQuery";

const biggerScreenBreakpoint = 1200;

const reversedLogoStyle = {
  transform: "scaleX(-1)",
};

const leftAndRightBoxStyle = {
  padding: 4,
  width: "20em",
  flexShrink: 0,
};

const midBoxStyle = {
  padding: 1,
  flexGrow: 1,
  flexShrink: 1,
};

const MainPage = () => {
  const navigate = useNavigate();
  const biggerScreen = useMediaQuery(`(min-width:${biggerScreenBreakpoint}px)`);

  const handleButtonClick = () => {
    navigate(URL_PATHS.searchRoot + "/" + QUERY_THAT_RETURNS_ALL_ITEMS);
  };

  return (
    <>
      <MonsterSearchBar />
      <Paper sx={{ display: "flex", marginBottom: "1em" }}>
        {biggerScreen && (
          <Box sx={leftAndRightBoxStyle}>
            <Logo style={reversedLogoStyle} />
          </Box>
        )}
        <Box sx={midBoxStyle}>
          <Typography variant="h2" textAlign={"center"}>
            D&D Monsters
          </Typography>
          <Stack spacing={2}>
            <Typography>
              This web app shows basic information about monsters from the
              fantasy tabletop role-playing game "Dungeons and Dragons" (5th
              edition). It fetches data from a{" "}
              <Link href="https://www.dnd5eapi.co/docs/#overview">
                free API
              </Link>
              . Currently this API provides images for only a small subset of
              monsters, so I'm showing a logo in cases where a proper image is
              not available.
            </Typography>
            <Typography>
              This is a practice project. My main purpose was to learn the
              Material UI library which I had never used before.
            </Typography>
            <Box>
              <Typography variant="h3" fontSize={"1.2em"}>
                App features:
              </Typography>
              <Typography component="ul">
                <li>
                  <strong>Sign up</strong> and <strong>Sign in</strong>
                </li>
                <li>
                  <strong>Search</strong> monsters by name
                </li>
                <li>
                  Check out <strong>individual monster pages</strong> with stats
                </li>
                <li>
                  Browse <strong>Search History</strong> when signed in
                </li>
                <li>
                  Add monsters to <strong>Favorites</strong> when signed in
                </li>
                <li>
                  User data is saved to localStorage and is restored upon
                  revisiting the page
                </li>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontSize={"1.2em"}>
                Technologies used:
              </Typography>
              <Typography component="ul">
                <li>
                  <strong>TypeScript</strong> programming language
                </li>
                <li>
                  <strong>React</strong> library for rendering
                </li>
                <li>
                  <strong>React Router</strong> library for routing
                </li>
                <li>
                  <strong>Material UI</strong> component library
                </li>
                <li>
                  <strong>Redux</strong> library for state management
                </li>
                <li>
                  <strong>dayjs</strong> library for timestamps on the Search
                  History page
                </li>
              </Typography>
            </Box>
            <Typography>
              Thank you for checking out this app. Have fun!
            </Typography>
            <Button onClick={handleButtonClick} sx={{ alignSelf: "center" }}>
              Show All Monsters
            </Button>
          </Stack>
        </Box>
        {biggerScreen && (
          <Box sx={leftAndRightBoxStyle}>
            <Logo />
          </Box>
        )}
      </Paper>
    </>
  );
};

export default MainPage;
