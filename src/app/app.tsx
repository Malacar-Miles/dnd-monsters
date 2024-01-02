import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux-store";
import Header from "widgets/header";
import MainPage from "pages/main";
import SignUpPage from "pages/sign-up";
import SignInPage from "pages/sign-in";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Header />
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </Container>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
