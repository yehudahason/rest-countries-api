import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "./components/Main";
import Layout from "./Layout";
import type { Country } from "./types";
import CountryPage from "./CountryPage";
import BookMarks from "./BookMarks";
export default function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [countryPage, setCountryPage] = useState<Country | "">("");

  const [favorite, setFavorite] = useState<Country[]>([]);
  const [list, setList] = useState<Country[]>([]);

  const baseUrl = import.meta.env.BASE_URL;
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const { isLoading, error, data } = useQuery<Country[]>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}data.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    },
  });
  if (isLoading) return "Loading...";

  if (error) return <h1>{error.message}</h1>;
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout dark={dark} setDark={setDark} />}>
            <Route
              path="/"
              element={
                <Main
                  data={data ?? []}
                  searchTerm={searchTerm}
                  searchRegion={searchRegion}
                  setSearchTerm={setSearchTerm}
                  setSearchRegion={setSearchRegion}
                  list={list}
                  setList={setList}
                  favorite={favorite}
                  setFavorite={setFavorite}
                />
              }
            />
            <Route
              path="/country/:name"
              element={
                <CountryPage
                  data={data ?? []}
                  countryPage={countryPage}
                  setCountryPage={setCountryPage}
                />
              }
            />
            <Route
              path="bookmarks"
              element={<BookMarks setList={setList} list={list ?? []} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}
