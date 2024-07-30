import { React } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import {
  Navbar,
  Footer,
  Home,
  Cryptocurrencies,
  CryptoDetails,
} from "./components";
import NotFound from "./components/NotFound/NotFound.jsx";
import ScrollToTop from "./helper/ScrollToTop";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Home />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
          <Route
            path="/cryptocurrencies"
            element={<Cryptocurrencies />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
          <Route
            path="/crypto/:id"
            element={<CryptoDetails />}
            onUpdate={() => window.scrollTo(0, 0)}
          />

          <Route
            path="*"
            element={<NotFound />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
