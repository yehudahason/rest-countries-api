import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import Layout from "./components/Layout";
import type { Country } from "./types";
import FlagPage from "./components/FlagPage";
export default function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [flagPage, setFlagPage] = useState<Country | "">("");
  const baseUrl = import.meta.env.BASE_URL;
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <BrowserRouter basename={baseUrl}>
        <Routes>
          <Route element={<Layout dark={dark} setDark={setDark} />}>
            <Route
              path="/"
              element={
                <Main
                  searchTerm={searchTerm}
                  searchRegion={searchRegion}
                  setSearchTerm={setSearchTerm}
                  setSearchRegion={setSearchRegion}
                  setFlagPage={setFlagPage}
                />
              }
            />
            <Route
              path="*"
              element={<FlagPage flag={flagPage} setFlagPage={setFlagPage} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
