import { React } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import {
  Navbar,
  Footer,
  Home,
  Cryptocurrencies,
  Exchanges,
  News,
  CryptoDetails,
} from "./components";
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
            path="/exchanges"
            element={<Exchanges />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
          <Route
            path="/news"
            element={<News />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
          <Route
            path="/crypto/:id"
            element={<CryptoDetails />}
            onUpdate={() => window.scrollTo(0, 0)}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
