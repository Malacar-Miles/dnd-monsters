import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux-store";
import { useEffect } from "react";
import { dndMonsterApi } from "entities/monster";
import URL_PATHS from "./url-paths";
import Header from "widgets/header";
import MainPage from "pages/main";
import SignUpPage from "pages/sign-up";
import SignInPage from "pages/sign-in";
import SearchResultsPage from "pages/search-results";
import MonsterPage from "pages/monster";

function App() {
  useEffect(() => {
    store.dispatch(dndMonsterApi.endpoints.getAllMonsterNames.initiate());
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Header />
          <Routes>
            <Route index element={<MainPage />} />
            <Route path={URL_PATHS.signUp} element={<SignUpPage />} />
            <Route path={URL_PATHS.signIn} element={<SignInPage />} />
            <Route path={URL_PATHS.search} element={<SearchResultsPage />} />
            <Route path={URL_PATHS.monster} element={<MonsterPage />} />
          </Routes>
        </Container>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
