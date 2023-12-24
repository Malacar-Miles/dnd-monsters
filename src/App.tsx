import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "./ui/header/header";
import MainPage from "./ui/pages/main";
import SignUpPage from "./ui/pages/sign-up";
import SignInPage from "./ui/pages/sign-in";


function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<MainPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
